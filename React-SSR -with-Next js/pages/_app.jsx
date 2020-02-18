import React from 'react';
import App from 'next/app';
import DefaultLayout from 'components/shared/Layouts/default';
import { getUser} from 'utils';
import 'static/scss/global.scss';
import {initSocket} from 'lib/socketClient';

import  'bootstrap/dist/css/bootstrap.min.css';
import  'antd/dist/antd.min.css';

class AppWrapper extends App {
  static async getInitialProps({Component, ctx}) {
    let initialProps = {};

    if (Component.getInitialProps) {
      initialProps = await Component.getInitialProps(ctx);
    }
    if (Component.Layout && Component.Layout.getInitialProps) {
      await Component.Layout.getInitialProps(ctx);
    }

    if (ctx && ctx.req) {
      return { user: ctx.req.user, initialProps };
    } else {
      return { user: getUser(), initialProps};
    }
  }

  constructor(props) {
    super(props);
    this.state = {user: props.user, socketAuth: false};
    if (typeof window !== 'undefined' && props.user) {
      initSocket();
    }
  }

  render() {
    const { Component, pageProps, initialProps } = this.props;
    const Layout = Component.Layout || DefaultLayout;

    return (
        <Layout>
          <Component {...pageProps} {...initialProps} />
        </Layout>
    );
  }
}

export default AppWrapper;
