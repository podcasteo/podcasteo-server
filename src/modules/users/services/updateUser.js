import joi from 'joi'

import client from 'modules/users/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import rolesMiddleware from 'helpers/roles'

export default async function updateUser(userId, data, context) {
  joi.assert(userId, joi.string().required(), 'userId')
  joi.assert(data, joi.object().required(), 'data')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)

  if (user.id !== userId) {
    if (!authMiddleware.haveRole(user, rolesMiddleware.SUPERADMINISTRATOR)) {
      throw errMiddleware.forbidden()
    }
  }

  await client.updateUser(userId, data)

  return client.findOneById(userId)
}
