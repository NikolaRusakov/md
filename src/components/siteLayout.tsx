/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Props = {};

const SiteLayout: React.FC<Props> = props => {
  const router = useRouter();
  const endsWith = (arg: string[]): string[] => arg.filter(routeEnd => router.pathname.endsWith(routeEnd));
  return (
    <div>
      {/* fixme Staged for page-aware header */}
      {endsWith(['browse', 'search']).length > 0 && (
        <nav css={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/browse">
            <h1
              css={theme => ({
                textDecoration: 'underline',
                textDecorationColor: theme.colors.primary,
                cursor: 'pointer',
              })}>
              Home
            </h1>
          </Link>
          <Link href={{ pathname: '/search', query: {} }}>
            <h1
              css={theme => ({
                textDecoration: 'underline',
                textDecorationColor: theme.colors.secondary,
                cursor: 'pointer',
              })}>
              Search
            </h1>
          </Link>
        </nav>
      )}
      <main> {props.children}</main>
    </div>
  );
};

export default SiteLayout;
