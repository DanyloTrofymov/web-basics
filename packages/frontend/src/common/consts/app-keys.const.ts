// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN_STUDENT: 'JWT_TOKEN_STUDENT',
  JWT_TOKEN_INSTRUCTOR: 'JWT_TOKEN_INSTRUCTOR',
  ADDRESS: 'ADDRESS',
  TOKEN: 'TOKEN'
};

// React-query keys
export const QUERY_KEYS = {
  ALL_USERS: 'allusers',
  USER: 'user'
};

// Backend Routes
export const BACKEND_KEYS = {
  USERS_COUNT: 'user/count',
  LOGIN: 'user/login',
  SIGNUP: 'user/signup',
  FORGOT_PASSWORD: 'user/forgot-password',
  CONFIRM_EMAIL: 'user/confirm',
  CHANGE_PASSWORD: 'user/change-password',
  USER: 'user',
  ME: 'user/me'
};

export const ROUTER_KEYS = {
  ROOT: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESTORE_PASSWORD: '/forgot-password/:token',
  CONFIRM_EMAIL: '/confirmation/:token'
};
