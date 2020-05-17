/** @jsx jsx */
import { jsx } from '@emotion/core';
import Link from 'next/link';

export default function IndexPage() {
  return (
    <div
      css={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Link href="/browse">
        <a css={theme => ({ fontSize: theme.sizes['24'] })}>
          <h1
            css={{
              cursor: 'pointer',
              textAlign: 'center',
              textDecoration: 'underline',
              textDecorationColor: '#0000',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                textDecorationColor: '#000',
              },
            }}>
            Browse your favorite content
          </h1>
        </a>
      </Link>
    </div>
  );
}
