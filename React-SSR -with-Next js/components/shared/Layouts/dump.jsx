import React from 'react';
import PropTypes from 'prop-types';
import classes from 'static/scss/layouts/dump-layout.scss';

const Dump = ({children}) => {
  return (
    <main className={`${classes['dump-layout']} Content`}>
      {children}
    </main>
  );
};

Dump.propTypes = {
  children: PropTypes.element
};

export default React.memo(Dump);
