import joi from 'joi'

import client from 'modules/users/client'

export default async function findOneByEmail(email) {
  await joi.validate(email, joi.string().required())

  const result = await client.findOneByEmail(email)

  if (!result) {
    throw new Error('NOT_FOUND')
  }

  return result
}
