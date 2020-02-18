import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import {Form, Col, Row} from 'react-bootstrap';
import { Icon } from 'antd';
import { Alert, Title, Button, Card, Brand } from 'components/shared/UI';
import SpecificationCheckbox from './SpecificationCheckbox';
import {
  ROLE_TYPES,
  FULL_NAME_VALIDATOR,
  EMAIL_VALIDATOR,
  PASSWORD_VALIDATOR,
  ORG_NUMBER_VALIDATOR,
  PHONE_NUMBER_VALIDATOR,
  TEXT_VALIDATOR,
  buildingElements, ADDRESS_REQUIRED_VALIDATOR,
} from 'utils';
import API, {catchAxiosError} from 'lib/axiosEnv';
import GoogleAutocomplete from 'components/shared/GoogleAutoComplete';
import classes from './signUp.scss';

let selectedPlace = '';
const TypeOrganization = (props) => {
  const { register, unregister, handleSubmit, setValue, errors, triggerValidation} = useForm({
    mode: 'onBlur',
  });
  const [eye, setEye] = useState(false);
  const [reqErrors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [stepNumber, setStepNumber] = useState(1);
  const [orgType, setOrgType] = useState(ROLE_TYPES.CONTRACTOR);
  const [processing, setProcessing] = useState(false);
  const [jobs, setJobs] = useState([]);
  const perFix = orgType === ROLE_TYPES.CONTRACTOR ? 'job' : 'be';

  const hourInputName = `${perFix}HourName`;
  const specInputKey = `${perFix}SpecName`;
  const isMobile = window.matchMedia('(max-width: 992px)').matches;

  useEffect(() => {
    getWorkforces();
  }, []);

  const getWorkforces = async () => {
    const {response} = await API.get('/getResources?type=workforce' ).catch(catchAxiosError);
    if(response) setJobs(response.resources);
  };


  useEffect(() => {

    return () => {
      selectedPlace = '';
    };
  }, []);

  useEffect(() => {
    if (reqErrors && reqErrors.length && isMobile) {
      const errorElement = document.querySelector('.error-msg');
      setTimeout(() => {
        errorElement.scrollIntoView({block: 'end', behavior: 'smooth'});
      }, 300);
    }
  }, [reqErrors, isMobile]);

  const onSubmit = async (inputSignUpOrganization) => {
    if (submitted || stepNumber === 1) return;
    setProcessing(true);
    setSubmitted(true);

    inputSignUpOrganization.specifications = inputSignUpOrganization[specInputKey] && inputSignUpOrganization[specInputKey].map((name, index) => ({
      specificationId: listData[index]._id,
      price_per_hour: parseFloat(inputSignUpOrganization[hourInputName][index]),
    })).filter(({specificationId, price_per_hour}) => specificationId && !!price_per_hour);
    delete inputSignUpOrganization[specInputKey];
    delete inputSignUpOrganization[hourInputName];

    const {response, error} = await API.post('/auth/organizationSignUp', { inputSignUpOrganization });

    if (response && response.success) {
      setStepNumber(3);
    } else if (error) {
      setValue('password', '');
      setErrors(error);
    }
    setProcessing(false);
    setSubmitted(false);
  };

  const setValueAndValidate = async (value) => {
    selectedPlace = value;
    await triggerValidation({ name: 'address' });
  };

  const validateAddress = (ev) => {
    if (!ev.target.value) selectedPlace = '';

    setValue('address', selectedPlace);
  };

  const handelEnter = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
    }
  };

  const onNextStep = () => {
    setStepNumber(2);
    setSubmitted(false);
    if (isMobile) {
      setTimeout(() => {
        document.querySelector('.fadeInLeft-enter-done').scrollIntoView({block: 'end', behavior: 'smooth'});
      }, 300);
    }
  };

  const onTypeChange = (e) => {
    unregister('nameSpec');
    setOrgType(e.target.value);
  };


  const StepOne = (
    <div className="wizard-inner">
      {reqErrors && reqErrors.length
        ? <Alert allow={reqErrors} messages={reqErrors} typeAlert="alert" type="danger" />
        : null}
      <Form.Group controlId="formUserName">
        <label htmlFor="formUserName" className="label-flat">Full Name</label>
        <Form.Control
          type="text"
          name="name"
          className="control-flat"
          placeholder="Enter your full name"
          ref={register(FULL_NAME_VALIDATOR)}
          isInvalid={(errors.name && errors.name.message) ||
          (errors.name && errors.name.type)}
        />
        <Form.Control.Feedback type="invalid">
          <Alert allow={errors.name} messages={errors.name && errors.name.message} typeAlert="alertFields" type="danger" />
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formOrganizationName">
        <label htmlFor="formOrganizationName" className="label-flat">Organization Name</label>
        <Form.Control
          type="text"
          name="organizationName"
          className="control-flat"
          ref={register(TEXT_VALIDATOR)}
          placeholder="iPlanner"
          isInvalid={errors.organizationName && errors.organizationName.message}
        />
        <Form.Control.Feedback type="invalid">
          <Alert allow={errors.organizationName} messages={errors.organizationName && errors.organizationName.message} typeAlert="alertFields" type="danger" />
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formOrgAddressID">
        <label htmlFor="formOrgAddressID" className="label-flat">Address</label>
        <Form.Control
          type="text"
          name="address"
          className="control-flat"
          ref={register(ADDRESS_REQUIRED_VALIDATOR)}
          onBlur={validateAddress}
          onKeyDown={handelEnter}
          placeholder="Organization address"
          isInvalid={errors.address && errors.address.message}
        />
        <GoogleAutocomplete
          inputId="formOrgAddressID"
          setValueAndValidate={setValueAndValidate}
        />
        <Form.Control.Feedback type="invalid">
          <Alert allow={errors.address} messages={errors.address && errors.address.message} typeAlert="alertFields" type="danger" />
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formOrganizationNR">
        <label htmlFor="formOrganizationNR" className="label-flat">Organization NR</label>
        <Form.Control
          type="text"
          name="organizationNR"
          className="control-flat"
          ref={register(ORG_NUMBER_VALIDATOR)}
          placeholder="123456-7890"
          isInvalid={errors.organizationNR && errors.organizationNR.message}
        />
        <Form.Control.Feedback type="invalid">
          <Alert allow={errors.organizationNR} messages={errors.organizationNR && errors.organizationNR.message} typeAlert="alertFields" type="danger" />
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formEmail">
        <label htmlFor="formEmail" className="label-flat">Email Address</label>
        <Form.Control
          type="email"
          name="email"
          className="control-flat"
          ref={register(EMAIL_VALIDATOR)}
          placeholder="yourname@example.com"
          isInvalid={errors.email && errors.email.message}
        />
        <Form.Control.Feedback type="invalid">
          <Alert allow={errors.email} messages={errors.email && errors.email.message} typeAlert="alertFields" type="danger" />
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formPhone">
        <label htmlFor="formPhone" className="label-flat">Mobile phone number</label>
        <Form.Control
          type="text"
          name="phone"
          className="control-flat"
          ref={register(PHONE_NUMBER_VALIDATOR)}
          placeholder="070-1234567"
          isInvalid={errors.phone && errors.phone.message}
        />
        <Form.Control.Feedback type="invalid">
          <Alert allow={errors.phone} messages={errors.phone && errors.phone.message} typeAlert="alertFields" type="danger" />
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formPassword" className="visible-eye-wrap">
        <label htmlFor="formPassword" className="label-flat">Password</label>
        <Form.Control
          type={eye ? 'text' : 'password'}
          name="password"
          className="control-flat"
          ref={register(PASSWORD_VALIDATOR)}
          placeholder="Password"
          isInvalid={(errors.password && errors.password.message) ||
          (errors.password && errors.password.type)}
        />
        <Icon type={eye ? 'eye' : 'eye-invisible'} onClick={() => setEye(!eye)} />
        <Form.Control.Feedback type="invalid">
          <Alert allow={errors.password && errors.password.type === 'containsDigit'} messages="Use 1 ore more numbers" typeAlert="alertFields" type="danger" />
          <Alert allow={errors.password && errors.password.type === 'containsUppercase'} messages="Use upper and lower case characters" typeAlert="alertFields" type="danger" />
          <Alert allow={errors.password} messages={errors.password && errors.password.message} typeAlert="alertFields" type="danger" />
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );

  const listData = orgType === ROLE_TYPES.CONTRACTOR ? jobs : buildingElements;
  const specificationsList = listData.map((item, index) => {
    return (
      <SpecificationCheckbox
        key={item._id}
        specInputKey={specInputKey}
        item={item}
        hourInputName={hourInputName}
        orgType={orgType}
        index={index}
        register={register}
      />
    );
  });
  const StepTwo = (
    <div className="wizard-inner">
      <div>
        <label className="label-flat">Are you a ... ?</label>
        <div className={classes['radio-selection']}>
          <Row>
            <Col md={6}>
              <div className={classes['radio-selection__card']}>
                <input
                  type="radio"
                  id="contractor"
                  name="selectedType"
                  value={ROLE_TYPES.CONTRACTOR}
                  ref={register}
                  onChange={onTypeChange}
                  defaultChecked
                />
                <label htmlFor="contractor">
                  <span className={classes['checked']} />
                  <div className={classes['radio-selection__content']}>
                    <Icon type="user" />
                    <span>Contractor</span>
                  </div>
                </label>
              </div>
            </Col>
            <Col md={6}>
              <div className={classes['radio-selection__card']}>
                <input
                  type="radio"
                  id="fabricator"
                  name="selectedType"
                  ref={register}
                  value={ROLE_TYPES.FABRICATOR}
                  onChange={onTypeChange}
                />
                <label htmlFor="fabricator">
                  <span className={classes['checked']} />
                  <div className={classes['radio-selection__content']}>
                    <Icon type="home" />
                    <span>House fabricator</span>
                  </div>
                </label>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div>
        <label className="label-flat label-flat--empty mt-5">Select Specifications you want</label>
        <SwitchTransition>
          <CSSTransition
            key={orgType}
            timeout={300}
            classNames="fadeInLeft"
          >
            <div>
              {specificationsList}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );

  const StepThree = (
    <>
      <Card
        className="mt-4"
        width="400px"
        align="center"
        padding="2rem"
      >
        <div className={classes['thank-you']}>
          <img src="/static/img/icons/mail.svg" className={classes['thank-you__icon']} alt="" />
          <h4 className={classes['thank-you__title']}>Thank you</h4>
          <p className={classes['thank-you__subtitle']}>Your submission has been received <br /> We will be in touch and contact you soon!</p>
        </div>
        <Button
          variant="primary"
          size="md"
          align="center"
          type="button"
          className="m-0 mt-3"
          link="/"
        >
          <i className="ion ion-md-arrow-back mr-2" />
          Back to Home
        </Button>
      </Card>
    </>
  );

  const StepRenderer = (
    <>
      <Card
        width={stepNumber === 2 ? '800px' : '400px'}
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
        <div className="wizard-wrapper">
          {StepOne}
          <SwitchTransition>
            <CSSTransition
              key={stepNumber}
              timeout={500}
              classNames="fadeInLeft"
            >
              <>
                {stepNumber === 2 && StepTwo}
              </>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div className="text-center mt-2">
          <SwitchTransition>
            <CSSTransition
              key={stepNumber}
              timeout={200}
              classNames="fade"
            >
              <>
                {stepNumber === 1 ?
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    className="m-0"
                    onClick={handleSubmit(onNextStep)}
                  >
                    Next
                    <i className="ion ion-md-arrow-forward ml-2" />
                  </Button> :
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    className="m-0"
                    disabled={submitted}
                    loading={processing}
                  >
                      Confirm Details
                    <i className="ion ion-md-checkmark ml-2" />
                  </Button>}
              </>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </Card>
    </>
  );

  const wrapper = (
    <>
      <SwitchTransition>
        <CSSTransition
          key={stepNumber === 3 ? 1 : 2}
          timeout={500}
          classNames="fadeInLeft"
        >
          <div>
            {stepNumber === 3 ? StepThree : StepRenderer}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {wrapper}
    </Form>
  );
};
TypeOrganization.propTypes = {
  onPrevClick: PropTypes.func
};

export default React.memo(TypeOrganization);
