import React, {useReducer, useState, useEffect, useContext} from 'react';
import MessageContext, { messageReducer, initialState } from '../MessageContext';
import PropTypes from 'prop-types';
import ChatRoom from './ChatRoom';
import Messages from './Messages';
import classes from './chat.scss';
import {  getConversationItemInfo } from './data';
import UserContext from '../UserContext';

const Chat = (props) => {
  const { user } = useContext(UserContext);

  const [messageState, messageDispatch] = useReducer(messageReducer, initialState);
  // // ****** BEGINNING OF CHANGE ******
  useEffect(() => {
    // Should not ever set state during rendering, so do this in useEffect instead.
    messageDispatch({conversations: {...props.conversations}});
    let validCId = false;
    if (props.cid) {
      for(const c of props.conversations){
        if (c.conversationId === props.cid) {
          validCId = true;
          const conversationItem = getConversationItemInfo(c['conversation'], user._id);
          messageDispatch({conversationId: c.conversationId, isFetching: true, conversationItem: conversationItem});
          break;
        }
      }
    }
    if (!validCId && !messageState.conversationId && props.conversations[0] && props.conversations[0]['conversation'] && props.conversations[0]['conversation']._id) {
      const conversationItem = getConversationItemInfo(props.conversations[0]['conversation'], user._id);
      messageDispatch({conversationId: props.conversations[0]['conversation']._id, isFetching: true, conversationItem: conversationItem});
    }
  });
  // ****** END OF CHANGE ******

  const messageProviderValue = { messageState, messageDispatch };

  return (
    <div className={classes['chat-wrapper']}>
      <MessageContext.Provider value={messageProviderValue}>
        <ChatRoom />
        <Messages />
      </MessageContext.Provider>
    </div>
  );
};

Chat.propTypes = {
  conversations: PropTypes.array,
  cid: PropTypes.string,
};


export default Chat;
