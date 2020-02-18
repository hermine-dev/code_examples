import { FULL_NAME_PATTERN, EMAIL_PATTERN, PHONE_PATTERN, DIDIT_PATTERN, UPPERCASE_LOWERCASE_PATTERN, ORG_NUMBER_PATTERN,FLOATING_NUMBER,NUMBER_ONLY } from './constants';

export const FULL_NAME_VALIDATOR = {
  required: 'Please complete this mandatory field',
  minLength: {
    value: 2,
    message: 'The minLength must be more then 2'
  },
  maxLength: {
    value: 255,
    message: 'The maxLength must be les then 255'
  },
  pattern: {
    value: FULL_NAME_PATTERN,
    message: 'Please write your name in format: John Doe',
  }
};

export const EMAIL_VALIDATOR = {
  required: 'Please complete this mandatory field',
  pattern: {
    value: EMAIL_PATTERN,
    message: 'Please write your email address in format: yourname@example.com',
  }
};


export const PHONE_NUMBER_VALIDATOR = {
  required: 'Please complete this mandatory field',
  pattern: {
    value: PHONE_PATTERN,
    message: 'Please write mobile phone number in format: 0701234567, length must be 10',
  }
};

export const PASSWORD_VALIDATOR = {
  required: 'Please complete this mandatory field',
  minLength: {
    value: 8,
    message: 'Use at least 8 characters'
  },
  validate: {
    containsDigit: value => DIDIT_PATTERN.test(value),
    containsUppercase: value => UPPERCASE_LOWERCASE_PATTERN.test(value)
  }
};

export const PASSWORD_VALIDATOR_NO_REQUIRED = {
  minLength: {
    value: 8,
    message: 'Use at least 8 characters'
  },
  validate: {
    containsDigit: value => !value || DIDIT_PATTERN.test(value),
    containsUppercase: value => !value || UPPERCASE_LOWERCASE_PATTERN.test(value)
  }
};


export const ADDRESS_VALIDATOR = {
  minLength: {
    value: 2,
    message: 'The minLength must be more then 2'
  },
  maxLength: {
    value: 150,
    message: 'The maxLength must be less then 150'
  },
};

export const ADDRESS_REQUIRED_VALIDATOR = {
  required: 'Please complete this mandatory field',
  minLength: {
    value: 2,
    message: 'The minLength must be more then 2'
  },
  maxLength: {
    value: 150,
    message: 'The maxLength must be less then 150'
  },
};



export const DESCRIPTION_VALIDATOR = {
  required: 'Please complete this mandatory field',
  minLength: {
    value: 2,
    message: 'The minLength must be more then 2'
  },
  maxLength: {
    value: 1000,
    message: 'The maxLength must be less then 5000'
  }
};

export const REQUIRE_VALIDATOR = {
  required: 'Please complete this mandatory field'
};



export const ORG_NUMBER_VALIDATOR = {
  required: 'Please complete this mandatory field',
  pattern: {
    value: ORG_NUMBER_PATTERN,
    message: 'Please write the number in format: 000000-0000',
  }
};

export const RESOURCE_PRICE_VALIDATOR ={
  required: 'Please complete this mandatory field',
  pattern: {
    value: FLOATING_NUMBER,
    message: 'Please write in this format: 123.45',
  }
};

export const NUMBER_VALIDATOR= {
  required: 'Please complete this mandatory field',
  pattern: {
    value: NUMBER_ONLY,
    message: 'Please write only numbers!',
  }
};

export const IMAGE_MAX_SIZE = 3000000; // 3 MB in bytes
export const IMAGE_ACCEPTED_EXT = 'image/x-png, image/png, image/jpg, image/jpeg';
