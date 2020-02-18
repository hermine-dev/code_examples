import React from 'react';
import PropTypes from 'prop-types';
import classes from 'static/scss/layouts/page.scss';

const DashboardWrapper = ({children}) => {
  return (
    <div className={classes['dashboard-wrapper']}>
      {children}
    </div>
  );
};

DashboardWrapper.propTypes = {
  children: PropTypes.node
};

export default React.memo(DashboardWrapper);
