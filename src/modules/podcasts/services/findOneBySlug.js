import joi from 'joi'

import client from 'modules/podcasts/client'

export default async function findOneBySlug(slug) {
  joi.assert(slug, joi.string().required(), 'slug')

  return client.findOneBySlug(slug)
}
