import React, { useEffect } from 'react';
import Router from 'next/router';

import cookie from 'js-cookie';
import {ROLE_TYPES} from './constants';

export const login = ({token, roleType}) => {
  // const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
  cookie.set('token', token, { expires: 1 /*1 day*/ });
  Router.push(getDashboardPathByRole(roleType));
};

export const getToken = () => {
  return cookie.get('token');
};

export const getUser = () => {
  const user = cookie.get('user');
  if (user) return JSON.parse(user);

  return null;
};

export const getCookieByKey = (key) => {
  return cookie.get(key);
};

export const removeCookieByKey = (key) => {
  cookie.remove(key);
};


export function redirectTo(res, path) {
  if (res) {
    res.writeHead(302, {
      Location: path
    });
    res.end();
  } else {
    Router.push(path);
    return {};
  }
}

/**
 * Get logged user dashboard path by role
 *
 * @param {string} roleType
 * @return {string}
 */
const getDashboardPathByRole = (roleType) => {
  let path = '/';
  switch(roleType) {
    case ROLE_TYPES.CUSTOMER:
      path = '/customer/dashboard';
      break;
    case ROLE_TYPES.ADMIN:
      path = '/admin/dashboard';
      break;
    default:
      path = '/';
  }
  return path;
};

export function checkLoggedInUser(req, res, role, redirect = '/signin'){
  const me = req && req.user ? req.user : getUser();
  if(!me) return redirectTo(res, redirect);

  if(me && (me.roleType === role || (role instanceof Array && role.indexOf(me.roleType) > -1 ) || role === ROLE_TYPES.LOGGED_USER)){
      return { me };
  }
  const path = getDashboardPathByRole(me.roleType);
  redirectTo(res, path);
}


/**
 *
 * @param { boolean } isUserDeactivated
 */
export const logout = (isUserDeactivated = false) => {
  // to support logging out from all windows
  if (isUserDeactivated === true) {
    cookie.set('user_deactivated', true, { expires: new Date(new Date().getTime() + 2 * 60 * 1000) /*2 minutes*/ });
  }
  window.localStorage.setItem('logout', Date.now());
  _removeCookies();
};

const _removeCookies = () => {
  cookie.remove('token');
  cookie.remove('user');

  console.log('logged out from storage!');
  Router.push('/signin');
};

export const withAuthSync = WrappedComponent => {
   const Wrapper = (props) => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        _removeCookies();
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);

    return <WrappedComponent {...props} />;
  };


  return Wrapper;
};
