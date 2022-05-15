import 'faust.config';
import { FaustProvider } from '@faustjs/next';
import 'normalize.css/normalize.css';
import 'styles/main.scss';
import React from 'react';
import { client } from 'client';
import ThemeStyles from 'components/ThemeStyles/ThemeStyles';
import { wrapper } from "modules/store.js";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeStyles />
      <FaustProvider client={client} pageProps={pageProps}>
        <Component {...pageProps} />
      </FaustProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);