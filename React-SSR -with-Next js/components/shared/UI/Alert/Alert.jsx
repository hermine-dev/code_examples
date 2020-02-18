import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import classes from './alert.scss';

const AlertWrap = (props) => {
  let listErrors = null;
  let classAlert = '';

  useEffect(() => {
    if (props.parentRef.current && props.allow) {
      props.sendMessage();
    }
  }, [props.parentRef]);

  if (props.messages instanceof Array) {
    listErrors = props.messages.map((message, index) => {
      return (
        <span key={index}>{message.message}</span>
      );
    });
  } else {
    listErrors = <span>{props.messages}</span>;
  }
  if (props.typeAlert === 'alert') {
    classAlert = props.type + '-message-wrapper';
    return (
      <div className={classes[classAlert]}>
        {listErrors}
      </div>
    );
  } else if (props.typeAlert === 'alertFields') {
    classAlert = props.type + '-message-wrapper-fields';
    return (
      <div>
        {listErrors}
      </div>
    );
  }
};

AlertWrap.propTypes = {
  parentRef: PropTypes.any,
  sendMessage: PropTypes.func
};

const Alert = (props) => {
  const wrapperAlert = useRef();
  let [scrollHeightAlert, setScrollHeightAlert] = useState(0);
  let [opacityAlert, setOpacityAlert] = useState(0);
  const changeStyle = () => {
    if (props.messages) {
      setTimeout(() => {
        setScrollHeightAlert(wrapperAlert.current && wrapperAlert.current.scrollHeight || 0);
      }, 0);
    } else {
      setScrollHeightAlert(0);
    }
    setTimeout(() => {
      setOpacityAlert(1);
    }, 150);
  };
  return (
    <div className={`${classes['alert-message-wrapper']} error-msg`} ref={wrapperAlert} style={{height: scrollHeightAlert + 'px', opacity: opacityAlert}}>
      {props.allow && <AlertWrap sendMessage={() => changeStyle()} {...props} parentRef={wrapperAlert} />}
    </div>
  );
};

Alert.propTypes = {
  typeAlert: PropTypes.string,
  messages: PropTypes.any,
  type: PropTypes.string,
  allow: PropTypes.any,
};

Alert.Item = Alert;
export default Alert;
