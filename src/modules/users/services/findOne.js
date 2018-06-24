import joi from 'joi'

import client from 'modules/users/client'

export default async function findOne(args) {
  await joi.validate(args, {
    email: joi.string(),
    id: joi.string(),
  })

  let result

  if (args.id) {
    result = await client.findOneById(args.id)
  } else if (args.email) {
    result = await client.findOneByEmail(args.email)
  }

  if (result) {
    return result
  }

  throw new Error('NOT_FOUND')
}
