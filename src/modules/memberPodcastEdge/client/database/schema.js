import joi from 'joi'

import rolesMiddleware from 'helpers/roles'

export const model = joi.object().keys({
  _from: joi.string().required(),
  _to: joi.string().required(),
  role: joi.string()
    .valid(Object.keys(rolesMiddleware).map((key) => rolesMiddleware[key]))
    .default(rolesMiddleware.STANDARD),
  type: joi.string().valid([
    'MEMBER',
    'ANIMATOR',
    'GUEST',
    'PRODUCER',
    'MANAGER',
  ]).default('MEMBER'),
  createdAt: joi.string(),
})

export const selector = joi.object()
