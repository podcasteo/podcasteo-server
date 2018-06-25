import joi from 'joi'

export const model = joi.object().keys({
  _from: joi.string().required(),
  _to: joi.string().required(),
  role: joi.string().valid([
    'SIMPLE',
    'ADMINISTRATOR',
    'SUPERADMINISTRATOR',
  ]).default('SIMPLE'),
  type: joi.string().valid([
    'MEMBER',
    'PRODUCER',
    'MANAGER',
  ]).default('MEMBER'),
  createdAt: joi.string(),
})

export const selector = joi.object()
