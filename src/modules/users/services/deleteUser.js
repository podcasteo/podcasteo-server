import joi from 'joi'

import userClient from 'modules/users/client'
import followUserClient from 'modules/followUserEdge/client'
import likeGroupClient from 'modules/likeGroupEdge/client'
import memberGroupClient from 'modules/memberGroupEdge/client'
import authMiddleware from 'helpers/authentification'

export default async function deleteUser(userId, context) {
  joi.assert(userId, joi.string().required(), 'userId')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)

  if (user.id !== userId && user.role !== 'SUPERADMINISTRATOR') {
    throw new Error('NOT_ALLOW')
  }

  await userClient.deleteUser(userId)
  await followUserClient.deleteFollowUserByUser(userId)
  await likeGroupClient.deleteLikeGroupByUser(userId)
  await memberGroupClient.deleteMemberGroupByUser(userId)

  return {
    result: 'ok',
  }
}
