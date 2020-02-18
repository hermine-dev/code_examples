import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

const API_KEY = process.env.GOOGLE_AUTOCOMPLETE_KEY;

const GoogleAutocomplete = (props) => {

  const onScriptLoad = useCallback(() => {
    const el = document.getElementById(props.inputId);
    const autocomplete = new window.google.maps.places.Autocomplete(el);
    autocomplete.setFields(['adr_address', 'name', 'formatted_address']);
    window.google.maps.event.addListener(autocomplete, 'place_changed', function () {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        el.value = place.formatted_address;
        props.setValueAndValidate(el.value);
      }
    });
  }, [props]);

  useEffect(() => {
    if (!window.google && !window.googleLoading) {
      window.googleLoading = true;
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
      script.id = 'googleMaps';
      document.head.appendChild(script);
      script.addEventListener('load', e => {
       onScriptLoad();
       window.googleLoading = false;
      });
    } else if (window.google && !window.googleLoading){
      onScriptLoad();
    }

  }, [onScriptLoad]);

  return null;
};

GoogleAutocomplete.propTypes = {
  inputId: PropTypes.string,
  setValueAndValidate: PropTypes.func,
};
export default GoogleAutocomplete;

