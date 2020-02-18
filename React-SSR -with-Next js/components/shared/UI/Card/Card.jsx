import React from 'react';
import PropTypes from 'prop-types';
import CardTitle from './CardTitle';
import classes from './card.scss';

const Card = (props) => {
  let align = '';
  switch (props.align) {
    case 'left':
      align = classes['app-card-wrapper--left'];
      break;
    case 'right':
      align = classes['app-card-wrapper--right'];
      break;
    case 'center':
      align = classes['app-card-wrapper--center'];
      break;
  }

  const isMobileFlat = props.mobileFlat ? classes['is-mobile-flat'] : '';

  return (
    <div className={`${classes['app-card-wrapper']} ${align} ${isMobileFlat} ${props.className || ''}`}>
      <div
        className={`${classes['app-card']} ${props.flat ? classes['app-card--flat'] : ''}`}
        style={{width: props.width, padding: props.padding || 0}}
      >
        {props.children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  width: PropTypes.string,
  align: PropTypes.string,
  padding: PropTypes.string,
  flat: PropTypes.bool,
  mobileFlat: PropTypes.bool,
  className: PropTypes.node
};

Card.Title = CardTitle;

export default Card;
