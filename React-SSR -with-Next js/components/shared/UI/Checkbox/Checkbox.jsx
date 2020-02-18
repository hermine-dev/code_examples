import React from 'react';
import classes from './checkbox.scss';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
  return (
    <label
      className={classes['app-checkbox']}
      htmlFor={props.name}
    >
      <span className={classes['app-checkbox__label']}>{props.label}</span>
      <input
        type="checkbox"
        id={props.name}
        onChange={props.onChange}
      />
      <span className={classes['checkmark']} />
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
};

export default React.memo(Checkbox);
