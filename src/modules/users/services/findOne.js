import joi from 'joi'

import client from 'modules/users/client'
import errMiddleware from 'helpers/errors'

export default async function findOne(options) {
  joi.assert(options, joi.object().keys({
    email: joi.string(),
    id: joi.string(),
  }).required(), 'options')

  if (options.id) {
    return client.findOneById(options.id)
  } else if (options.email) {
    return client.findOneByEmail(options.email)
  }

  throw errMiddleware.badRequest()
}
