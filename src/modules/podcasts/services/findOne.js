import joi from 'joi'

import client from 'modules/podcasts/client'
import errMiddleware from 'helpers/errors'

export default async function findOne(options) {
  joi.assert(options, joi.object().keys({
    id: joi.string(),
    slug: joi.string(),
  }).required(), 'options')

  if (options.id) {
    return client.findOneById(options.id)
  } else if (options.slug) {
    return client.findOneBySlug(options.slug)
  }

  throw errMiddleware.badRequest()
}
