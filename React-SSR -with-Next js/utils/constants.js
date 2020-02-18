export const FULL_NAME_PATTERN = /^[\p{L}\s]*$/iu;
export const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/i;
export const ORG_NUMBER_PATTERN = /^[0-9]{6}-[0-9]{4}$/;
export const PHONE_PATTERN = /^\+?\d{10}$/;
export const DIDIT_PATTERN = /\d+/i;
export const UPPERCASE_LOWERCASE_PATTERN = /(?=.*[\p{Lu}])(?=.*[\p{Ll}])[\p{L}\s]+/u;
export const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[\p{Lu}])(?=.*[\p{Ll}])[0-9\p{L}\s]{8,}$/u;
export const FLOATING_NUMBER = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
export const NUMBER_ONLY = /^[0-9]+$/;
export const IMAGE_MAX_SIZE = 5621440;
export const EXCEL_FILE_EXT = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const baseUrl = process.env.BASE_URL;
export const ROLE_TYPES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  NOT_LOGGED: 'not_logged',
  LOGGED_USER: 'logged_user'
};

export const REQUEST_STATUS = {
  REQUESTED: 'requested',
  DECLINED: 'declined',
  ACCEPTED: 'accepted',
};

export const RESOURCE_TYPES = {
  MATERIAL: 'material',
  WORKFORCE: 'workforce',
};



export const API_URL = baseUrl + '/api/v1';
export const UPLOAD_IMAGES_PATH = '/images';
export const STATIC_AVATAR_PATH = '/static/img/default-user-avatar.png';
export const DEFAULT_PER_PAGE = 20;

export const NOTIFICATIONS = { // here we need to add all collection names which can be as notification type

};


export const MESSAGES_SCROLL_TOP_CHECK_VALUE = 0.86; // This need for correct showing "New Message" in messages page
