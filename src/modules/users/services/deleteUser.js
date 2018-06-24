import joi from 'joi'

import userClient from 'modules/users/client'
import followUserClient from 'modules/followUserEdge/client'
import authMiddleware from 'helpers/authentification'

export default async function deleteUser(userId, context) {
  const user = authMiddleware.handleUser(context)

  joi.assert(userId, joi.string().required(), 'userId')
  joi.assert(context, joi.object().required(), 'context')
  joi.assert(user, joi.object().required(), 'user')

  if (user.id !== userId && user.role !== 'SUPERADMINISTRATOR') {
    throw new Error('NOT_ALLOW')
  }

  await userClient.deleteUser(userId)
  await followUserClient.deleteFollowUserByUser(userId)

  return {
    result: 'ok',
  }
}
