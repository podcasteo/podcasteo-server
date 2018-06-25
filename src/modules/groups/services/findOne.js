import joi from 'joi'

import client from 'modules/groups/client'

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

  throw new Error('NOT_FOUND')
}
