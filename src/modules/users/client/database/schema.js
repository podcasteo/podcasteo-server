import joi from 'joi'

export const model = joi.object().keys({
  id: joi.string().required(),
  email: joi.string().required(),
  username: joi.string().required(),
  password: joi.string(),
  avatar: joi.string(),
  description: joi.string(),
  firstname: joi.string(),
  lastname: joi.string(),
  birthday: joi.date(),
  facebook: joi.string(),
  twitter: joi.string(),
  soundcloud: joi.string(),
  itunes: joi.string(),
  role: joi.string(),
  createdAt: joi.string(),
})

export const selector = joi.object()
