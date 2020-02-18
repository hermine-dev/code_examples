import React, {Suspense, useEffect, useState} from 'react';
import Head from 'next/head';
import {Icon} from 'antd';
import useForm from 'react-hook-form';
import { Form, Container } from 'react-bootstrap';
import DumpLayout from 'components/shared/Layouts/dump';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import {
  login,
  checkRole,
  API_URL,
  EMAIL_VALIDATOR,
  REQUIRE_VALIDATOR,
  ROLE_TYPES,
  getCookieByKey,
  removeCookieByKey,
  Notify
} from 'utils';
import { Button, Card, Title, Brand, Alert } from 'components/shared/UI';
const SignUp = React.lazy(() => import('./signup'));
import API from 'lib/axiosEnv';

const SignInPage = () => {
  const { register, handleSubmit, formState, setValue, errors, clearError } = useForm({
    mode: 'onBlur',
  });
  const [reqErrors, setErrors] = useState([]);
  const [eye, setEye] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [forgotPasswordClicked, setFPasswordClicked] = useState(false);
  const [isResetSent, setResetPasswordSent] = useState(false);
  const [fromType, setFormType] = useState('signIn');
  const [processing, setProcessing] = useState(false);

  const onSubmit = async (data) => {
    if (submitted) return;
    setProcessing(true);

    setSubmitted(true);
    setErrors([]);

    const {response, error} = await API.post('/auth/signin', data);

    if (response) {
      login(response);
    } else if (error) {
      setValue('password', '');
      setErrors(error);
    }
    setProcessing(false);
    setSubmitted(false);
  };

  const sendEmail = async (data) => {
    setProcessing(true);
    if (submitted || !formState.isValid) return;

    setSubmitted(true);
    setErrors([]);

    const {response, error} = await API.post('/auth/sendResetPassword',  {email: data.resetEmail});
    if (response && response.success) {
      setResetPasswordSent(true);
      setTimeout(() => {
        setResetPasswordSent(false);
        onBack();
      }, 2500);/*For Alert Message hiding after 2.5 sec*/
    } else if (error) {
      setErrors(error);
    }
    setProcessing(false);
    setSubmitted(false);
  };

  const appId = process.env.FACEBOOK_APP_ID;
  const googleSignIn = () => {
    window.location.href = API_URL +'/auth/google';
  };

  const facebookSignIn = () => {
    window.location.href = API_URL +'/auth/facebook';
  };

  useEffect(() => {
    const error = getCookieByKey('facebook_email_error');
    if (error) {
      removeCookieByKey('facebook_email_error');
      setErrors([{message: 'Your facebook account doesn\'t have email. Email is required'}]);
    }

    const userDeactivated = getCookieByKey('user_deactivated');
    if (userDeactivated) {
      removeCookieByKey('user_deactivated');
      setErrors([{message: 'Your account is inactivated by Admin. Please contact admin for help'}]);
    }
  }, []);

  const onSignUpClick = () => {
    setFormType('signUp');
  };

  const onSetFPasswordClicked = () => {
    clearError('email');
    setFPasswordClicked(true);
    setErrors([]);
  };

  const onBack = () => {
    setFormType('signIn');
    setFPasswordClicked(false);
  };

  const buttonOrMessage = isResetSent ? (<Alert allow={reqErrors} messages="Reset Email successfully sent please check your email" typeAlert="alert" type="success" className="mt-2" />) :
    (
      <div className="mt-3">
        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={submitted}
          loading={processing}
          block
        >
          Send
          <i className="ion ion-md-arrow-forward ml-2" />
        </Button>
      </div>
    );
  const signInForm = (
    <Card
      className="mt-sm-4"
      width="400px"
      align="center"
      padding="2rem"
      mobileFlat
    >
      <Brand />
      <Title
        className="mb-4 mt-4"
        renderTag="h2"
        align="center"
        color="gray"
        size="sm"
        family="serif"
      >
        Welcome Back
      </Title>
      {reqErrors && reqErrors.length
        ? <Alert allow={reqErrors} messages={reqErrors} typeAlert="alert" type="danger" />
        : null}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <label htmlFor="formBasicEmail" className="label-flat">Email</label>
          <Form.Control
            type="email"
            name="email"
            className="control-flat"
            ref={register(EMAIL_VALIDATOR)}
            placeholder="Enter your email"
            isInvalid={errors.email && errors.email.message}
          />
          <Form.Control.Feedback type="invalid">
            <Alert allow={errors.email} messages={errors.email && errors.email.message} typeAlert="alertFields" type="danger" />
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="visible-eye-wrap">
          <label htmlFor="formBasicPassword" className="label-flat">Password</label>
          <Form.Control
            type={eye ? 'text' : 'password'}
            name="password"
            className="control-flat"
            ref={register(REQUIRE_VALIDATOR)}
            placeholder="Enter your Password"
            isInvalid={errors.password && errors.password.message}
          />
          <Icon type={eye ? 'eye' : 'eye-invisible'} onClick={() => setEye(!eye)} />
          <Form.Control.Feedback type="invalid">
            <Alert allow={errors.password} messages={errors.password && errors.password.message} typeAlert="alertFields" type="danger" />
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-end align-items-center my-4">
          <p className="p-sm">
            <a onClick={onSetFPasswordClicked}>Forget Password?</a>
          </p>
        </div>
        <div className="mt-2">
          <Button
            variant="primary"
            type="submit"
            size="md"
            block
            loading={processing}
            disabled={submitted}
          >
            Sign in
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
          className="btn-google-sign"
          type="button"
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
        Don't have an account? <a onClick={onSignUpClick}>Sign Up</a>
      </p>
    </Card>
  );

  const forgotPassword = (
    <>
      <Card
        className="mt-xs-4"
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
            onClick={onBack}
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
          Reset Password
        </Title>
        {reqErrors && reqErrors.length
          ? <Alert allow={reqErrors} messages={reqErrors} typeAlert="alert" type="danger" />
          : null}
        <Form onSubmit={handleSubmit(sendEmail)}>
          <label htmlFor="email" className="label-flat">We will send you a reset link</label>
          <Form.Control
            type="email"
            id="email"
            name="resetEmail"
            className="control-flat"
            ref={register(EMAIL_VALIDATOR)}
            placeholder="Email"
            isInvalid={errors.resetEmail && errors.resetEmail.message}
          />
          <Form.Control.Feedback type="invalid">
            <Alert allow={errors.resetEmail} messages={errors.resetEmail && errors.resetEmail.message} typeAlert="alertFields" type="danger" />
          </Form.Control.Feedback>
          {buttonOrMessage}
        </Form>
      </Card>
    </>
  );

  let content = '';
  if (!forgotPasswordClicked && fromType === 'signIn') {
    content = signInForm;
  } else if (!forgotPasswordClicked && fromType === 'signUp') {
    content = <Suspense fallback={null}><SignUp /></Suspense>;
  } else if (forgotPasswordClicked) {
    content = forgotPassword;
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <script crossOrigin="anonymous" src={`https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0&appId=${appId}&autoLogAppEvents=1`} async defer />
      </Head>
      <Container>
        <SwitchTransition>
          <CSSTransition
            key={forgotPasswordClicked + fromType}
            timeout={300}
            classNames="fadeInLeft"
          >
            <div>
              {content}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </Container>
    </>
  );
};

SignInPage.getInitialProps = async ({ res, req }) => {
  return await checkRole(req, res, ROLE_TYPES.NOT_LOGGED, '/');
};

SignInPage.Layout = DumpLayout;

export default SignInPage;
