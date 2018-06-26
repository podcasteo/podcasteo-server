import joi from 'joi'

import client from 'modules/groups/client'
import memberGroupClient from 'modules/memberGroupEdge/client'
import likeGroupClient from 'modules/likeGroupEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import rolesMiddleware from 'helpers/roles'

export default async function deleteGroup(groupId, context) {
  joi.assert(groupId, joi.string().required(), 'groupId')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)
  let membership

  try {
    membership = await memberGroupClient.findOneByEdge(user.id, groupId)
  } catch (error) {
    if (error.status === errMiddleware.notFound().status) {
      membership = {}
    }
  }

  if (!authMiddleware.haveRole(membership, rolesMiddleware.SUPERADMINISTRATOR) &&
      !authMiddleware.haveRole(user, rolesMiddleware.SUPERADMINISTRATOR)) {
    throw errMiddleware.forbidden()
  }

  // delete group - memberEdge - likeEdge - podcastEdge
  await likeGroupClient.deleteLikeGroupByGroup(groupId)
  await memberGroupClient.deleteMemberGroupByGroup(groupId)
  await client.deleteGroup(groupId)

  return {
    result: 'ok',
  }
}
