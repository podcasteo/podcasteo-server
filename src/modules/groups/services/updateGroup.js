import joi from 'joi'

import client from 'modules/groups/client'
import memberGroupClient from 'modules/memberGroupEdge/client'
import authMiddleware from 'helpers/authentification'

export default async function updateGroup(groupId, data, context) {
  joi.assert(groupId, joi.string().required(), 'groupId')
  joi.assert(data, joi.object().required(), 'dataGroup')
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

  if (membership.role !== 'ADMINISTRATOR' && user.role !== 'SUPERADMINISTRATOR') {
    throw new Error('NOT_ALLOW')
  }

  await client.updateGroup(groupId, data)

  return client.findOneById(groupId)
}
