import React from 'react';
import PropTypes from 'prop-types';
import classes from './title.scss';

const Title = (props) => {
  let align = '';
  switch (props.align) {
    case 'center':
      align = classes['app-title--center'];
      break;
    case 'right':
      align = classes['app-title--right'];
      break;
    case 'left':
      align = classes['app-title--left'];
      break;
  }

  let color = '';
  switch (props.color) {
    case 'light':
      color = classes['app-title--light'];
      break;
    case 'dark':
      color = classes['app-title--dark'];
      break;
    case 'gray':
      color = classes['app-title--gray'];
      break;
  }

  let family = '';
  switch (props.family) {
    case 'serif':
      family = classes['app-title--serif'];
      break;
    case 'base':
      family = classes['app-title--base'];
      break;
  }

  let size = '';
  switch (props.size) {
    case 'xs':
      size = classes['app-title--xs'];
      break;
    case 'sm':
      size = classes['app-title--sm'];
      break;
    case 'md':
      size = classes['app-title--md'];
      break;
    case 'lg':
      size = classes['app-title--lg'];
      break;
    case 'xl':
      size = classes['app-title--xl'];
      break;
    case 'xxl':
      size = classes['app-title--xxl'];
      break;
  }

  const transform = props.uppercase ? classes['app-title--uppercase'] : '';

  const Underline = props.underline ? <div className={classes['app-title__underline']} /> : '';

  const SubTitle = props.subtitle ? <span className={`${classes['app-title__sub']} ${align} ${color}`}>{props.subtitle}</span> : '';

  const Element = React.createElement(props.renderTag,
    {className: `${classes['app-title']} ${align} ${size} ${transform} ${family} ${color}`},
    props.children);

  const Paragraph = props.paragraph ? <p className={`${classes['app-title__par']} ${!Underline ? 'mt-2' : ''} ${align} ${color}`}>{props.paragraph}</p> : '';

  return (
    <div className={props.className}>
      {SubTitle}
      {Element}
      {Underline}
      {Paragraph}
    </div>
  );
};

Title.propTypes = {
  children: PropTypes.node,
  renderTag: PropTypes.string,
  subtitle: PropTypes.string,
  paragraph: PropTypes.node,
  align: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  uppercase: PropTypes.bool,
  underline: PropTypes.bool,
  family: PropTypes.string,
  className: PropTypes.node
};

export default Title;
