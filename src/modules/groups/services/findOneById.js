import joi from 'joi'

import client from 'modules/groups/client'

export default async function findOneById(id) {
  await joi.validate(id, joi.string().required())

  const result = await client.findOneById(id)

  if (!result) {
    throw new Error('NOT_FOUND')
  }

  return result
}
