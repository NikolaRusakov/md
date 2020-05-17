/** @jsx jsx */
import { jsx } from '@emotion/core';
import { mq } from '../utils/theme';
import { assetTitleOrName, imageOrPlaceholder, isImage } from '../../utils';
import { Asset } from '../redux/assets';
import Link from 'next/link';

export const AssetItemSkeleton: React.FC<{ index: string }> = ({ index }) => (
  <div
    key={`skeleton-${index}`}
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
    <img
      css={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        cursor: 'pointer',
      }}
      src={imageOrPlaceholder(undefined)}
    />
  </div>
);

const AssetItem: React.FC<{ index: number; asset: Asset }> = ({ index, asset }) => (
  <Link
    href={{
      pathname: '/browse/detail/[id]',
      query: { type: asset?.media_type === 'movie' ? 'movie' : 'tv' },
    }}
    as={{
      pathname: `/browse/detail/${asset.id}`,
      query: { type: asset?.media_type === 'movie' ? 'movie' : 'tv' },
    }}>
    <a
      tabIndex={0}
      key={`${asset.title}-${index}`}
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
      <article>
        <img
          css={{
            '&:focus': { outline: 'thick double #32a1ce' },
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            cursor: 'pointer',
          }}
          src={imageOrPlaceholder(asset.poster_path)}
        />
        {!isImage(asset.poster_path) && (
          <span
            css={theme => ({
              position: 'absolute',
              top: 0,
              fontSize: theme.fontSizes[4],
              overflow: 'hidden',
              height: '100%',
              cursor: 'pointer',
            })}>
            {assetTitleOrName(asset)}
          </span>
        )}
      </article>
    </a>
  </Link>
);

export default AssetItem;
