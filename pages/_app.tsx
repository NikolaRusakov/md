import 'swiper/css/swiper.css';
import 'shaka-player/dist/controls.css';
import 'react-virtualized/styles.css';

import withRedux from 'next-redux-wrapper';
import { NextComponentType } from 'next';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import React from 'react';
import SiteLayout from '../src/components/siteLayout';
// @ts-ignore
import { PageTransition } from 'next-page-transitions';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
// @ts-ignore
import tailwind from '@theme-ui/preset-tailwind';
// const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, pageProps, ...etc }) => {
//   const getLayout =
//     // @ts-ignore
//     Component.getLayout || ((page: React.ReactNode) => <SiteLayout children={page} />);
//   return getLayout(<Component {...pageProps} />);
// };
const TIMEOUT = 400;
// FixMe Page transitions ??
function MyApp({ Component, pageProps, router }: AppProps) {
  console.log(pageProps);
  return (
    <ThemeProvider theme={tailwind}>
      <SiteLayout>
        {/*<PageTransition*/}
        {/*  timeout={TIMEOUT}*/}
        {/*  classNames="page-transition"*/}
        {/*  loadingComponent={<div>Loading</div>}*/}
        {/*  loadingDelay={500}*/}
        {/*  loadingTimeout={{*/}
        {/*    enter: TIMEOUT,*/}
        {/*    exit: 0,*/}
        {/*  }}*/}
        {/*  loadingClassNames="loading-indicator">*/}
        <Component {...pageProps} />
        {/*</PageTransition>*/}
      </SiteLayout>
    </ThemeProvider>
  );
}

// // Only uncomment this method if you have blocking data requirements for
// // every single page in your application. This disables the ability to
// // perform automatic static optimization, causing every page in your app to
// // be server-side rendered.

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   return { ...appProps };
// };

export default MyApp;