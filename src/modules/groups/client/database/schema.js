import joi from 'joi'

export const model = joi.object().keys({
  id: joi.string().required(),
  name: joi.string().required(),
  slug: joi.string().required(),
  description: joi.string(),
  avatar: joi.string(),
  facebook: joi.string(),
  twitter: joi.string(),
  soundcloud: joi.string(),
  itunes: joi.string(),
  createdAt: joi.string(),
})

export const selector = joi.object()
