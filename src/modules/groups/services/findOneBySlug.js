import joi from 'joi'

import client from 'modules/groups/client'

export default async function findOneBySlug(slug) {
  joi.assert(slug, joi.string().required(), 'slug')

  const result = await client.findOneById(slug)

  if (!result) {
    throw new Error('NOT_FOUND')
  }

  return result
}
