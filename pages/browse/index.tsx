/** @jsx jsx */
import { jsx } from '@emotion/core';

import { GetServerSideProps } from 'next';

import { assetTitleOrName, composeQuery, imageOrPlaceholder, isImage } from '../../utils';
import Carousel from '../../src/components/carousel';
import Link from 'next/link';
import fetcher from '../../lib/fetcher';
import { mq } from '../../src/utils/theme';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wrapper, assetAdded, assetsReceived, Asset } from '../../src/redux/assets';

function Browse(props: { carousels: { label: string; data: any }[] }) {
  // fixme doesn't hydrate store from SSR on Client
  const dispatch = useDispatch();
  useEffect(() => {
    const allAssets = props.carousels.map(({ data }) => data.results).flat(1);
    dispatch(assetsReceived(allAssets));
  }, [props.carousels]);
  return (
    <>
      {props?.carousels?.map(({ data, label }, index) => (
        <section key={`${label}-${index}`}>
          <h1>{label}</h1>
          <Carousel>
            {/*// @ts-ignore*/}
            {data.results.map<Asset>((results, index) => (
              <div
                key={`browse-${label}-${results.title}-${index}`}
                css={mq({
                  position: 'relative',
                  height: ['120px', '140px', '160px'],
                  width: ['80px', '100px', '120px'],
                  '&:before': {
                    content: '""',
                    display: 'block',
                    paddingTop: '80%',
                  },
                  marginRight: '10px',
                  // marginRight: typeof window === 'undefined' ? '10px' : null,
                })}>
                <Link
                  href={{
                    pathname: '/browse/detail/[id]',
                    query: { type: results?.media_type === 'movie' ? 'movie' : 'tv' },
                  }}
                  as={{
                    pathname: `/browse/detail/${results.id}`,
                    query: { type: results?.media_type === 'movie' ? 'movie' : 'tv' },
                  }}>
                  <img
                    css={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '100%',
                      cursor: 'pointer',
                    }}
                    src={imageOrPlaceholder(results.poster_path)}
                  />
                </Link>
                {!isImage(results.poster_path) && (
                  <span css={theme => ({ position: 'absolute', top: 0, fontSize: theme.fontSizes[4] })}>
                    {assetTitleOrName(results)}
                  </span>
                )}
              </div>
            ))}
          </Carousel>
        </section>
      ))}
    </>
  );
}
// todo Migrate over to SWR
const moviesAsProps = async () => {
  const trendingMovies = await fetcher(composeQuery(`trending/movies/week`));
  const trendingShows = await fetcher(composeQuery(`trending/tv/week`));
  const documentaryShows = await fetcher(
    composeQuery(
      'discover/tv',
      'language=en-US&sort_by=popularity.desc&page=1&with_genres=99&include_null_first_air_dates=false',
    ),
  );
  const familyShows = await fetcher(
    composeQuery(
      'discover/tv',
      `language=en-US&sort_by=popularity.desc&page=1&with_genres=10751&include_null_first_air_dates=false`,
    ),
  );
  return {
    props: {
      carousels: [
        { label: 'Trending Movies', data: await trendingMovies },
        { label: 'Trending Shows', data: await trendingShows },
        {
          label: 'Documentary Shows',
          data: await documentaryShows,
        },
        { label: 'Family Shows', data: await familyShows },
      ],
    },
  };
};
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, res, ...etc }) => {
    console.log('2. getServerSideProps uses the store to dispatch things');
    const trendingMovies = await fetcher(composeQuery(`trending/movies/week`));
    const moviesResults = await trendingMovies.results;
    store.dispatch(assetAdded(moviesResults[0]));
    return moviesAsProps();
  },
);

export default wrapper.withRedux(Browse);
