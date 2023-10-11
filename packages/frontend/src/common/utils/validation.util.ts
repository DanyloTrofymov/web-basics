import { FormikValues } from 'formik';

const todoValidationConstants = {
  titleMinLength: 1,
  titleMaxLength: 50,
  descriptionMinLength: 1,
  descriptionMaxLength: 500
};


const regexp = {
  pibPattern: /^[А-ЩЬЮЯҐІЇЄґ][а-щьюяґіїєҐІЇЄґ']+ [А-ЩЬЮЯҐІЇЄґ][а-щьюяґіїєҐІЇЄґ']+ [А-ЩЬЮЯҐІЇЄґ][а-щьюяґіїєҐІЇЄґ']+$/,
  groupPattern: /^[А-ЯҐЄІ]+-[0-9]{2}$/,
  phonePattern: /^\+(?:\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,9}[-.\s]?\d{1,9}[-.\s]?\d{1,9}$/,
  idCardPattern: /^\d{9}$/,
  facultyPattern: /^[А-ЯҐЄІ]+$/,
  email: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
}
const userConstants = {
  usernameMinLength: 8,
  usernameMaxLength: 64,
  passwordMinLength: 8,
  passwordMaxLength: 64
};

export const validateEmail = (values: FormikValues) => {
  const errors: Partial<FormikValues> = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!regexp.email.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const validateUsername = (username: string) => {
  const errors: Partial<FormikValues> = {};
  if (!username) {
    errors.username = 'Username is required';
  } else if (
    username.length < userConstants.usernameMinLength ||
    username.length > userConstants.usernameMaxLength
  ) {
    errors.username = `Username must be between ${userConstants.usernameMinLength} and ${userConstants.usernameMaxLength} characters`;
  }
  return errors;
};

const validateName = (name: string) => {
  const errors: Partial<FormikValues> = {};
  if (!name) {
    errors.name = 'Name is required';
  } else if (regexp.pibPattern.test(name) === false) {
    errors.name = 'Invalid name';
  }
  return errors;
}

const validateGroup = (group: string) => {
  const errors: Partial<FormikValues> = {};
  if (!group) {
    errors.group = 'Group is required';
  } else if (regexp.groupPattern.test(group) === false) {
    errors.group = 'Invalid group';
  }
  return errors;
}

const validatePhone = (phone: string) => {
  const errors: Partial<FormikValues> = {};
  if (!phone) {
    errors.phone = 'Phone is required';
  } else if (regexp.phonePattern.test(phone) === false) {
    errors.phone = 'Invalid phone';
  }
  return errors;
}

const validateIdCard = (idCard: string) => {
  const errors: Partial<FormikValues> = {};
  if (!idCard) {
    errors.idCard = 'ID card is required';
  } else if (regexp.idCardPattern.test(idCard) === false) {
    errors.idCard = 'Invalid ID card';
  }
  return errors;
}

const validateFaculty = (faculty: string) => {
  const errors: Partial<FormikValues> = {};
  if (!faculty) {
    errors.faculty = 'Faculty is required';
  } else if (regexp.facultyPattern.test(faculty) === false) {
    errors.faculty = 'Invalid faculty';
  }
  return errors;
}

const validatePassword = (password: string) => {
  const errors: Partial<FormikValues> = {};
  if (!password) {
    errors.password = 'Password is required';
  } else if (
    password.length < userConstants.passwordMinLength ||
    password.length > userConstants.passwordMaxLength
  ) {
    errors.password = `Password must be between ${userConstants.passwordMinLength} and ${userConstants.passwordMaxLength} characters`;
  }
  return errors;
};
const validateRepeatPassword = (password: string, repeatPassword: string) => {
  const errors: Partial<FormikValues> = {};
  if (!repeatPassword) {
    errors.repeatPassword = 'Repeat password is required';
  } else if (!password.match(repeatPassword)) {
    errors.repeatPassword = 'Passwords do not match';
  }
  return errors;
};

export const validateTodoForm = (values: FormikValues) => {
  const errors: Partial<FormikValues> = {};

  if (!values.title) {
    errors.title = 'Title is required';
  }
  if (values.title.length > todoValidationConstants.titleMaxLength) {
    errors.title = `Title is too long. Max ${todoValidationConstants.titleMaxLength} characters`;
  }
  if (values.description.length > todoValidationConstants.descriptionMaxLength) {
    errors.description = `Description is too long. Max ${todoValidationConstants.descriptionMaxLength} characters`;
  }

  return errors;
};
export const validateUserEditForm = (values: FormikValues) => {
  const errors: Partial<FormikValues> = {};
  if (values.length === 0) {
    errors.values = 'At least one value is required';
  }
  const usernameValidation = validateUsername(values.username).username;
  if (usernameValidation) {
    errors.username = usernameValidation;
  }
  const emailValidation = validateEmail(values).email;
  if (emailValidation) {
    errors.email = emailValidation;
  }
    const nameValidation = validateName(values.name).name;
  if (nameValidation) {
    errors.name = nameValidation;
  }
  const groupValidation = validateGroup(values.group).group;
  if (groupValidation) {
    errors.group = groupValidation;
  }
  const phoneValidation = validatePhone(values.phone).phone;
  if (phoneValidation) {
    errors.phone = phoneValidation;
  }
  const idCardValidation = validateIdCard(values.idCard).idCard;
  if (idCardValidation) {
    errors.idCard = idCardValidation;
  }
  const facultyValidation = validateFaculty(values.faculty).faculty;
  if (facultyValidation) {
    errors.faculty = facultyValidation;
  }
  return errors;
};

export const validateLoginForm = (values: FormikValues) => {
  const errors: Partial<FormikValues> = {};
  const usernameValidation = validateUsername(values.username).username;
  if (usernameValidation) {
    errors.username = usernameValidation;
  }
  const passwordValidation = validatePassword(values.password).password;
  if (passwordValidation) {
    errors.password = passwordValidation;
  }
  return errors;
};

export const validateSignUpForm = (values: FormikValues) => {
  const errors: Partial<FormikValues> = validateLoginForm(values);
  const emailValidation = validateEmail(values).email;
  if (emailValidation) {
    errors.email = emailValidation;
  }
  const repeatPasswordValidation = validateRepeatPassword(
    values.password,
    values.repeatPassword
  ).repeatPassword;
  if (repeatPasswordValidation) {
    errors.repeatPassword = repeatPasswordValidation;
  }
  const nameValidation = validateName(values.name).name;
  if (nameValidation) {
    errors.name = nameValidation;
  }
  const groupValidation = validateGroup(values.group).group;
  if (groupValidation) {
    errors.group = groupValidation;
  }
  const phoneValidation = validatePhone(values.phone).phone;
  if (phoneValidation) {
    errors.phone = phoneValidation;
  }
  const idCardValidation = validateIdCard(values.idCard).idCard;
  if (idCardValidation) {
    errors.idCard = idCardValidation;
  }
  const facultyValidation = validateFaculty(values.faculty).faculty;
  if (facultyValidation) {
    errors.faculty = facultyValidation;
  }

  return errors;
};

export const validatePasswordChangeForm = (values: FormikValues) => {
  const errors: Partial<FormikValues> = {};
  const oldPasswordValidation = validatePassword(values.oldPassword).password;
  if (oldPasswordValidation) {
    errors.oldPassword = oldPasswordValidation;
  }
  const newPasswordValidation = validatePassword(values.password).password;
  if (newPasswordValidation) {
    errors.password = newPasswordValidation;
  }
  const repeatPasswordValidation = validateRepeatPassword(
    values.password,
    values.repeatPassword
  ).repeatPassword;
  if (repeatPasswordValidation) {
    errors.repeatPassword = repeatPasswordValidation;
  }
  return errors;
};

export const validateRestorePasswordForm = (values: FormikValues) => {
  const errors: Partial<FormikValues> = {};
  const passwordValidation = validatePassword(values.password).password;
  if (passwordValidation) {
    errors.password = passwordValidation;
  }
  const repeatPasswordValidation = validateRepeatPassword(
    values.password,
    values.repeatPassword
  ).repeatPassword;
  if (repeatPasswordValidation) {
    errors.repeatPassword = repeatPasswordValidation;
  }
  return errors;
};

export const restorePasswordInitialValues = {
  password: '',
  repeatPassword: ''
};

export const loginInitialValues = {
  username: '',
  password: ''
};

export const signupInitialValues = {
  username: '',
  email: '',
  group: '',
  name: '',
  phone: '',
  idCard: '',
  faculty: '',
  password: '',
  repeatPassword: ''
};
