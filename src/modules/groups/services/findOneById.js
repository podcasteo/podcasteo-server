import joi from 'joi'

import client from 'modules/groups/client'

export default async function findOneById(id) {
  joi.assert(id, joi.string().required(), 'id')

  const result = await client.findOneById(id)

  if (!result) {
    throw new Error('NOT_FOUND')
  }

  return result
}
