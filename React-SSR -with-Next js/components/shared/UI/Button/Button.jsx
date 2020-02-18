import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classes from './button.scss';

const Button = (props) => {
  const icon = props.icon ? classes['app-btn--icon'] : '';
  let variant = '';
  switch (props.variant) {
    case 'primary':
      variant = classes['app-btn--primary'];
      break;
    case 'secondary':
      variant = classes['app-btn--secondary'];
      break;
    case 'dark':
      variant = classes['app-btn--dark'];
      break;
    case 'default':
      variant = classes['app-btn--default'];
      break;
    case 'light':
      variant = classes['app-btn--light'];
      break;
  }

  let size = '';
  switch (props.size) {
    case 'sm':
      size = classes['app-btn--sm'];
      break;
    case 'md':
      size = classes['app-btn--md'];
      break;
    case 'lg':
      size = classes['app-btn--lg'];
      break;
  }

  let align = '';
  switch (props.align) {
    case 'center':
      align = classes['app-btn-wrapper--center'];
      break;
    case 'right':
      align = classes['app-btn-wrapper--right'];
      break;
  }

  const isRounded = props.isRounded ? classes['app-btn--rounded'] : '';

  const isOutline = props.isOutline ? classes['app-btn--outline'] : '';

  const block = props.block ? classes['app-btn-wrapper--block'] : '';

  const hasShadow = props.hasShadow ? '' : classes['app-btn--disableShadow'];

  let Content = '';
  props.link ?
    Content =
      <Link href={props.link} prefetch={false}>
        <a className={`${classes['app-btn']} ${variant} ${size} ${isRounded} ${isOutline} ${icon} ${hasShadow} ${props.className}`}><span>{props.children}</span></a>
      </Link> :
    Content =
      <button
        type={props.type || 'button'}
        className={`${classes['app-btn']} ${variant} ${size} ${isRounded} ${isOutline} ${icon} ${hasShadow} ${props.className} ${props.loading ? 'processing-btn' : ''}`}
        disabled={props.disabled || props.loading}
        onClick={props.onClick}
      >
        {props.children}
      </button>;

  return (
    <div className={`${classes['app-btn-wrapper']} ${align} ${block}`}>
      {Content}
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
  link: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  align: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.bool,
  block: PropTypes.bool,
  isRounded: PropTypes.bool,
  isOutline: PropTypes.bool,
  hasShadow: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  className: '',
  hasShadow: true
};

export default Button;
