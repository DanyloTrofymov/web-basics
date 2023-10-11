import Joi from 'joi';

const userConstants = {
  usernameMinLength: 8,
  usernameMaxLength: 64,
  passwordMinLength: 8,
  passwordMaxLength: 64,
  facultyMinLength: 2,
  facultyMaxLength: 4
};

export const userSchema = Joi.object({
  id: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }),
  username: Joi.string()
    .alphanum()
    .min(userConstants.usernameMinLength)
    .max(userConstants.usernameMaxLength),
  name: Joi.string(),
  group: Joi.string(),
  phone: Joi.string(),
  idCard: Joi.number(),
  faculty: Joi.string().min(userConstants.facultyMinLength).max(userConstants.facultyMaxLength),
  email: Joi.string().email(),
  password: Joi.string().min(userConstants.passwordMinLength).max(userConstants.passwordMaxLength),
  repeatPassword: Joi.ref('password'),
  isAdmin: Joi.boolean(),
  oldPassword: Joi.string()
    .min(userConstants.passwordMinLength)
    .max(userConstants.passwordMaxLength),
  token: Joi.string(),
  user: Joi.object({
    id: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }),
    username: Joi.string(),
    email: Joi.string(),
    iat: Joi.number(),
    isAdmin: Joi.boolean(),
    exp: Joi.number()
  })
});
