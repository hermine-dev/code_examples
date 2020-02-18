import React from 'react';
import Head from 'next/head';
import DashboardWrapper from 'components/shared/Hocs/DashboardWrapper';
import Chat from 'components/Messages';
import {getConversations} from 'utils/chat';
import PropTypes from 'prop-types';
import RoleBase from 'lib/roleBase';
import {ROLE_TYPES} from 'utils/constants';

const MessagesPage = (props) => {
  return (
    <div>
      <Head>
        <title>Messages</title>
      </Head>
      <DashboardWrapper>
        <Chat {...props}  />
      </DashboardWrapper>
    </div>
  );
};

MessagesPage.propTypes = {
  conversations: PropTypes.array
};


MessagesPage.getInitialProps = async ({query}) => {
  const resp = await getConversations();
  return {
    conversations: (resp && resp.data) || [],
    cid: query.cid
  };
};

export default RoleBase(MessagesPage, ROLE_TYPES.LOGGED_USER);
