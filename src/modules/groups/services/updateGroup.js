import joi from 'joi'

import client from 'modules/groups/client'
import memberGroupClient from 'modules/memberGroupEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import rolesMiddleware from 'helpers/roles'

export default async function updateGroup(groupId, data, context) {
  joi.assert(groupId, joi.string().required(), 'groupId')
  joi.assert(data, joi.object().required(), 'dataGroup')
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

  if (!authMiddleware.haveRole(membership, rolesMiddleware.ADMINISTRATOR) &&
      !authMiddleware.haveRole(user, rolesMiddleware.SUPERADMINISTRATOR)) {
    throw errMiddleware.forbidden()
  }

  await client.updateGroup(groupId, data)

  return client.findOneById(groupId)
}
