/** @jsx jsx */
import { jsx } from '@emotion/core';

import { GetServerSideProps, GetStaticProps } from 'next';

import { assetTitleOrName, composeQuery, imageOrPlaceholder, isImage } from '../../utils';
import Carousel from '../../src/components/carousel';
import Link from 'next/link';
import fetcher from '../../lib/fetcher';
import { mq } from '../../src/utils/theme';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper, assetAdded, assetsReceived, Asset } from '../../src/redux/reducers/assets';
import AssetItem from '../../src/components/assetItem';

function Browse(props: { carousels: { label: string; data: any }[] }) {
  // fixme doesn't hydrate store from SSR on Client
  const dispatch = useDispatch();
  useEffect(() => {
    const allAssets = props.carousels.map(({ data }) => data.results).flat(1);
    dispatch(assetsReceived(allAssets));
  }, []);
  return (
    <>
      {props?.carousels?.map(({ data, label }, index) => (
        <section key={`${label}-${index}`}>
          <h1>{label}</h1>
          <Carousel>
            {/*// @ts-ignore*/}
            {data.results.map<Asset>((results, index) => (
              <AssetItem key={`browse-${label}-${results.title}-${index}`} asset={results} index={index} />
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
