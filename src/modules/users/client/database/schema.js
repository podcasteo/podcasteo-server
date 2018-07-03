import joi from 'joi'

import rolesMiddleware from 'helpers/roles'

export const model = joi.object().keys({
  id: joi.string().required(),
  username: joi.string().required(),
  slug: joi.string(),
  email: joi.string(),
  password: joi.string(),
  avatar: joi.string(),
  description: joi.string(),
  firstname: joi.string(),
  lastname: joi.string(),
  birthday: joi.date(),
  gender: joi.string(),
  facebook: joi.string(),
  twitter: joi.string(),
  soundcloud: joi.string(),
  itunes: joi.string(),
  facebookId: joi.string(),
  role: joi.string()
    .valid(Object.keys(rolesMiddleware).map((key) => rolesMiddleware[key]))
    .default(rolesMiddleware.STANDARD),
  createdAt: joi.string(),
}).or('email', 'facebookId')

export const selector = joi.object()
