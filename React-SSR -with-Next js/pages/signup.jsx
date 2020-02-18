import React, { useState } from 'react';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import DumpLayout from 'components/shared/Layouts/dump';
import TypeSelection from 'components/SignUp/TypeSelection';
import TypeUser from 'components/SignUp/TypeUser';
import TypeOrganization from 'components/SignUp/TypeOrganization';
import {checkRole, ROLE_TYPES} from 'utils';

const SignUpPage = () => {
  const [type, setType] = useState('');
  const emitTypeChange = (data) => {
    setType(data);
  };

  let content = <TypeSelection onTypeChange={emitTypeChange} key={1} />;
  if (type && type === ROLE_TYPES.CONTRACTOR) {
    content = <TypeOrganization onPrevClick={emitTypeChange} key={2} />;
  } else if (type) {
    content = <TypeUser onPrevClick={emitTypeChange} key={3} />;
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Container>
        <SwitchTransition>
          <CSSTransition
            key={content.key}
            timeout={300}
            classNames="fadeInLeft"
            unmountOnExit
          >
            {content}
          </CSSTransition>
        </SwitchTransition>
      </Container>
    </>
  );
};

SignUpPage.getInitialProps = async ({ res, req }) => {
  return await checkRole(req, res, ROLE_TYPES.NOT_LOGGED, '/');
};

SignUpPage.Layout = DumpLayout;

export default SignUpPage;
