import React from 'react';
import PropTypes from 'prop-types';

const CardTitle = (props) => {
  return (
    <p className="card-title">
      {props.children}
    </p>
  );
};

CardTitle.propTypes = {
  children: PropTypes.node
};

export default CardTitle;
