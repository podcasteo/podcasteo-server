import joi from 'joi'

import client from 'modules/users/client'
import authMiddleware from 'helpers/authentification'

export default async function updateUser(userId, data, context) {
  const user = authMiddleware.handleUser(context)

  joi.assert(userId, joi.string().required(), 'userId')
  joi.assert(data, joi.object().required(), 'data')
  joi.assert(context, joi.object().required(), 'context')

  if (user.id !== userId && user.role !== 'ADMINISTRATOR') {
    throw new Error('NOT_ALLOW')
  }

  await client.updateUser(userId, data)

  return client.findOneById(userId)
}
