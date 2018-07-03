import joi from 'joi'

import client from 'modules/users/client'

export default async function findOneByEmail(slug) {
  joi.assert(slug, joi.string().required(), 'slug')

  return client.findOneBySlug(slug)
}
