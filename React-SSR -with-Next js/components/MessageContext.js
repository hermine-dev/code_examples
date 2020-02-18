import { createContext } from 'react';

export const initialState = {
  conversationId: null,
  conversationItem: null,
  isFetching: false,
  mobRoomIsShown: false,
  conversations: [],
};

export const messageReducer = (state, action) => {
  return {...state, ...action};
};

const MessageContext = createContext(initialState);
export default MessageContext;
