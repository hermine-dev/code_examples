import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Default = ({children}) => {
  return (
    <div>
      <Header />
      <main className="Content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Default.propTypes = {
  children: PropTypes.element
};

export default React.memo(Default);
