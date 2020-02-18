import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ROLE_TYPES} from 'utils';
import classes from './signUp.scss';

function SpecificationCheckbox (props) {
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  return (
    <div className={classes['specifications']} style={(props.disabled)? {'pointerEvents': 'none'}: {}}>
      <div className={classes['specifications__checkbox']}>
        <input
          type="checkbox"
          id={`checkFormGroup${props.item._id}`}
          name={`${props.specInputKey}[${props.index}]`}
          value={props.item.name}
          ref={props.register}
          onChange={() => setCheckboxStatus(!checkboxStatus)}
          checked={props.disabled}
        />
        <label htmlFor={`checkFormGroup${props.item._id}`}>
          <span className={classes['checked']} />
          <span className={classes['specifications__checkbox__name']}>{props.item.name}</span>
          <div className={classes['specifications__field']}>
            <input
              type="number"
              name={`${props.hourInputName}[${props.index}]`}
              min="0"
              step="0.1"
              value={props.item.price_per_hour}
              ref={props.register}
              placeholder="0"
              disabled={!checkboxStatus}
            />
            <span>
              {props.orgType === ROLE_TYPES.CONTRACTOR ?
                 '$/hr' :
                  'Price ㎡'}
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
SpecificationCheckbox.propTypes = {
  specInputKey: PropTypes.string,
  item: PropTypes.object,
  hourInputName: PropTypes.string,
  orgType: PropTypes.any,
  register: PropTypes.any,
  index: PropTypes.number,
  disabled: PropTypes.bool
};
export default SpecificationCheckbox;
