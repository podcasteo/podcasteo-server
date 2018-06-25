import joi from 'joi'

import client from 'modules/groups/client'
import memberGroupClient from 'modules/memberGroupEdge/client'
import likeGroupClient from 'modules/likeGroupEdge/client'
import authMiddleware from 'helpers/authentification'

export default async function deleteGroup(groupId, context) {
  joi.assert(groupId, joi.string().required(), 'groupId')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)
  let membership

  try {
    membership = await memberGroupClient.findOneByEdge(user.id, groupId)
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      membership = {}
    }
  }

  if (membership.role !== 'SUPERADMINISTRATOR' && user.role !== 'SUPERADMINISTRATOR') {
    throw new Error('NOT_ALLOW')
  }

  // delete group - memberEdge - likeEdge - podcastEdge
  await client.deleteGroup(groupId)
  await memberGroupClient.deleteMemberGroupByGroup(groupId)
  await likeGroupClient.deleteLikeGroupByGroup(groupId)

  return {
    result: 'ok',
  }
}
