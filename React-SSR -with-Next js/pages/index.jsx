import React from 'react';
import Head from 'next/head';
import Home from 'components/Home';

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>
      <Home />
    </div>
  );
};

export default HomePage;
