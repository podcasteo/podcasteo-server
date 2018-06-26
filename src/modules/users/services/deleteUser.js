import joi from 'joi'

import userClient from 'modules/users/client'
import followUserClient from 'modules/followUserEdge/client'
import likeGroupClient from 'modules/likeGroupEdge/client'
import likePodcastClient from 'modules/likePodcastEdge/client'
import memberGroupClient from 'modules/memberGroupEdge/client'
import memberPodcastClient from 'modules/memberPodcastEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import rolesMiddleware from 'helpers/roles'

export default async function deleteUser(userId, context) {
  joi.assert(userId, joi.string().required(), 'userId')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)

  if (user.id !== userId) {
    if (!authMiddleware.haveRole(user, rolesMiddleware.SUPERADMINISTRATOR)) {
      throw errMiddleware.forbidden()
    }
  }

  await followUserClient.deleteFollowUserByUser(userId)
  await likeGroupClient.deleteLikeGroupByUser(userId)
  await likePodcastClient.deleteLikePodcastByUser(userId)
  await memberGroupClient.deleteMemberGroupByUser(userId)
  await memberPodcastClient.deleteMemberPodcastByUser(userId)
  await userClient.deleteUser(userId)

  return {
    result: 'ok',
  }
}
