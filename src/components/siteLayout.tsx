/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SearchSection from './searchSection';
import { mediaQueries, mq } from '../utils/theme';
import { useMedia } from 'react-use';

type Props = {};

const SiteLayout: React.FC<Props> = props => {
  const router = useRouter();
  const endsWith = (arg: string[]): string[] => arg.filter(routeEnd => router.pathname.endsWith(routeEnd));
  const isSm = useMedia(mediaQueries.sm);
  const browseOrSearch = endsWith(['browse', 'search']);

  return (
    <div>
      {/* fixme Staged for page-aware header */}
      {browseOrSearch.length > 0 && (
        <nav
          css={theme =>
            mq({
              display: 'flex',
              justifyContent: 'space-between',
              boxShadow: theme.shadows['lg'],
              padding: theme.sizes['1'],
            })
          }>
          <div
            css={mq({
              display: 'flex',
              justifyContent: 'space-between',
              flex: 1,
            })}>
            <Link href="/browse">
              <a>
                <h1
                  css={theme => ({
                    textDecoration: 'underline',
                    textDecorationColor: theme.colors.primary,
                    cursor: 'pointer',
                  })}>
                  Home
                </h1>
              </a>
            </Link>
            {!browseOrSearch.includes('search') && (
              <Link href={{ pathname: '/search', query: {} }}>
                <a>
                  <h1
                    css={theme => ({
                      textDecoration: 'underline',
                      textDecorationColor: theme.colors.secondary,
                      cursor: 'pointer',
                    })}>
                    Search
                  </h1>
                </a>
              </Link>
            )}
          </div>
          {!isSm && browseOrSearch.includes('search') && (
            <div css={mq({ display: ['flex', 'none', 'none'], flex: 2 })}>
              <SearchSection initialProps initialState />
            </div>
          )}
        </nav>
      )}
      <main> {props.children}</main>
    </div>
  );
};

export default SiteLayout;
