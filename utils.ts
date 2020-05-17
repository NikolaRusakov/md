import getConfig from 'next/config';
import { Asset } from './src/redux/assets';
import { css } from '@emotion/core';

const { publicRuntimeConfig } = getConfig();
export const composeQuery = (path: string = '', params?: string) => {
  return `${publicRuntimeConfig.MOVIEDB_API_URL}${path}?${publicRuntimeConfig.MOVIEDB_API_KEY_PARAM}${
    params != null ? `&${params}` : ''
  }`;
};

export const imageOrPlaceholder = (src: string | undefined) =>
  src ? `http://image.tmdb.org/t/p/w342/${src}` : '/static/img/not-found.png';

export const isImage = (src: string | null | undefined): src is string => src != null;

export const assetTitleOrName = (asset: Asset) => (asset.title ? asset.title : asset.name ?? '');


export const globalNoOverflow = css`
         body {
           overflow-y: hidden;
         }
       `;
