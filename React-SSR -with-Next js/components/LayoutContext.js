import { createContext } from 'react';

export const initialState = {
  asideIsCollapsed: false
};

export const layoutReducer = (state, action) => {
  return {asideIsCollapsed: action.type};
};

const LayoutContext = createContext(initialState);
export default LayoutContext;
