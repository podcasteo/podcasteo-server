import joi from 'joi'

export const model = joi.object().keys({
  _from: joi.string().required(),
  _to: joi.string().required(),
  createdAt: joi.string(),
})

export const selector = joi.object()
