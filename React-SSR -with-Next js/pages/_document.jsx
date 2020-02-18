import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';


class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    return (
      <Html>
        <Head>
          <title>React nextjs</title>
        </Head>
        <body>
          <div id="fb-root" />
          <Main />
          <NextScript />
        </body>
        <div id="portal" />
      </Html>
    );
  }
}

export default MyDocument;
