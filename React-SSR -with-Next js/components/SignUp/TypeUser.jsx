import React, { useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import useForm from 'react-hook-form';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import {login, FULL_NAME_VALIDATOR, EMAIL_VALIDATOR, PASSWORD_VALIDATOR, ROLE_TYPES, API_URL} from 'utils';
import { Title, Button, Card, Brand, Alert } from 'components/shared/UI';
const SignIn = React.lazy(() => import('../../pages/signin'));
import API from 'lib/axiosEnv';

const TypeUser = (props) => {
  const { register, handleSubmit, formState, setValue, errors } = useForm({
    mode: 'onBlur',
  });
  const [reqErrors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [fromType, setFormType] = useState('signUp');
  const [processing, setProcessing] = useState(false);

  const onSubmit = async (data) => {
    if (submitted) return;
    setProcessing(true);
    setSubmitted(true);
    data.name = data.userName;
    delete data.userName;

    const {response, error} = await API.post('/auth/userSignUp', {inputSignUp: data});
    if (response) {
      login(response, ROLE_TYPES.CUSTOMER);
    } else if (error) {
      // console.log(error);
      setValue('password', '');
      setErrors(error);
    }
    setProcessing(false);
    setSubmitted(false);
  };

  const googleSignIn = () => {
    window.location.href = API_URL +'/auth/google';
  };

  const facebookSignIn = () => {
    window.location.href = API_URL +'/auth/facebook';
  };

  const onSignInClick = () => {
    setFormType('signIn');
  };


  const signInForm = (
    <Card
      className="mt-sm-4"
      width="400px"
      align="center"
      padding="2rem"
      mobileFlat
    >
      <div className="position-absolute">
        <Button
          className="px-1 py-1 my-1"
          type="button"
          variant="default"
          size="lg"
          onClick={() => props.onPrevClick('')}
        >
          <i className="ion ion-ios-arrow-round-back" />
        </Button>
      </div>
      <Brand />
      <Title
        className="mb-4 mt-4"
        renderTag="h2"
        align="center"
        color="gray"
        size="sm"
        family="serif"
      >
        Sign up
      </Title>
      {reqErrors && reqErrors.length
        ? <Alert allow={reqErrors} messages={reqErrors} typeAlert="alert" type="danger" />
        : null}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formUserName">
          <label htmlFor="formUserName" className="label-flat">Full Name</label>
          <Form.Control
            type="text"
            name="userName"
            className="control-flat"
            ref={register(FULL_NAME_VALIDATOR)}
            placeholder="Enter your full name"
            isInvalid={(errors.userName && errors.userName.message) ||
            (errors.userName && errors.userName.type)}
          />
          <Form.Control.Feedback type="invalid">
            <Alert allow={errors.userName} messages={errors.userName && errors.userName.message} typeAlert="alertFields" type="danger" />
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <label htmlFor="formEmail" className="label-flat">Email</label>
          <Form.Control
            type="email"
            name="email"
            className="control-flat"
            ref={register(EMAIL_VALIDATOR)}
            placeholder="Enter email"
            isInvalid={errors.email && errors.email.message}
          />
          <Form.Control.Feedback type="invalid">
            <Alert allow={errors.email} messages={errors.email && errors.email.message} typeAlert="alertFields" type="danger" />
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <label htmlFor="formPassword" className="label-flat">Password</label>
          <Form.Control
            type="password"
            name="password"
            className="control-flat"
            ref={register(PASSWORD_VALIDATOR)}
            placeholder="Password"
            isInvalid={(errors.password && errors.password.message) ||
            (errors.password && errors.password.type)}
          />
          <Form.Control.Feedback type="invalid">
            <Alert allow={errors.password && errors.password.type === 'containsDigit'} messages="Use 1 ore more numbers" typeAlert="alertFields" type="danger" />
            <Alert allow={errors.password && errors.password.type === 'containsUppercase'} messages="Use upper and lower case characters" typeAlert="alertFields" type="danger" />
            <Alert allow={errors.password} messages={errors.password && errors.password.message} typeAlert="alertFields" type="danger" />
          </Form.Control.Feedback>
        </Form.Group>
        <div className="text-center mt-4">
          <Button
            variant="primary"
            size="md"
            type="submit"
            block
            loading={processing}
            disabled={submitted}
          >
            Sign Up
          </Button>
        </div>
        <Title
          className="mb-4 mt-4"
          renderTag="h2"
          align="center"
          color="gray"
          size="xs"
          family="serif"
        >
          Or continue with
        </Title>
        <button
          id="signinButton"
          type="button"
          className="btn-google-sign"
          onClick={googleSignIn}
        >
          Sign in with Google
        </button>
        <button
          type="button"
          className="btn-facebook-sign"
          onClick={facebookSignIn}
        >
          Sign in with Facebook
        </button>
      </Form>
      <p className="p-sm text-center mt-5">
        Already have an account? <a onClick={onSignInClick}>Sign In</a>
      </p>
    </Card>
  );

  let content = '';
  if (fromType === 'signUp') {
    content = signInForm;
  } else if (fromType === 'signIn') {
    content = <Suspense fallback={null}><SignIn /></Suspense>;
  }

  return (
    <>
      <SwitchTransition>
        <CSSTransition
          key={fromType}
          timeout={300}
          classNames="fadeInLeft"
        >
          <div>
            {content}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

TypeUser.propTypes = {
  onPrevClick: PropTypes.func
};

export default React.memo(TypeUser);
