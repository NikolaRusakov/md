/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useRouter } from 'next/router';
import { mq } from '../utils/theme';
import { Asset } from '../redux/reducers/assets';
import Link from 'next/link';
import VideoButton from './videoButton';
import { assetTitleOrName, imageOrPlaceholder } from '../../utils';

const AssetDetail: React.FC<Asset> = props => {
  const router = useRouter();
  // @ts-ignore
  return (
    <div
      css={mq({
        display: 'flex',
        flexDirection: ['column', 'row', 'row'],
        justifyContent: 'space-evenly',
        overflow: 'hidden',
        position: 'relative',
      })}>
      <div
        css={mq({
          display: 'flex',
          flexDirection: 'column',
          width: ['100%', '60%', '50%'],
          order: [1, 0, 0],
        })}>
        <h1>{assetTitleOrName(props)}</h1>
        {props.tagline && <h3>{props.tagline}</h3>}
        <p css={theme => ({ fontSize: theme.fontSizes[4], maxWidth: '80%' })}>{props.overview}</p>
        <hr css={theme => ({ width: '80%', margin: 0, border: `1px solid ${theme.colors.secondary}` })} />
        {/* TODO make a section prettier*/}
        <ul css={theme => ({ fontSize: theme.fontSizes[3] })}>
          {props.release_date && <li>{props.release_date}</li>}
          {props.popularity && <li>Popularity - {props.popularity}</li>}
          {props.vote_average && <li>Average Rating - {props.vote_average}</li>}
        </ul>
        {/* solved by https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-function-component*/}
        <Link
          href={{ pathname: `/browse/detail/[id]/video` }}
          as={{ pathname: `/browse/detail/${router.query.id}/video` }}
          passHref>
          <VideoButton />
        </Link>
      </div>
      <div
        css={mq({
          overflow: 'hidden',
          position: 'relative',
          width: ['100%', '40%', '50%'],
          margin: [0, 'auto', 0],
          display: 'flex',
          justifyContent: 'center',
          order: [0, 1, 1],
        })}>
        <img
          css={mq({
            position: ['relative', 'relative', 'absolute'],
            top: 0,
            left: 0,
            width: ['67%', '67%', '80%'],
            height: ['auto', 'auto', '100%'],
            cursor: 'pointer',
          })}
          src={imageOrPlaceholder(props.poster_path)}
        />
      </div>
    </div>
  );
};

export default AssetDetail;
