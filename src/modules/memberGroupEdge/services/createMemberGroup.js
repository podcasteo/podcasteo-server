import joi from 'joi'

import client from 'modules/memberGroupEdge/client'
import groupClient from 'modules/groups/client'
import userClient from 'modules/users/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import rolesMiddleware from 'helpers/roles'

export default async function createMemberGroup(data, context) {
  joi.assert(data, joi.object().keys({
    _from: joi.string().required(),
    _to: joi.string().required(),
    role: joi.string(),
    type: joi.string(),
  }).required(), 'data')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)
  const userFrom = await userClient.findOneById(data._from)
  const groupTo = await groupClient.findOneById(data._to)
  let myMembership

  try {
    myMembership = await client.findOneByEdge(user.id, groupTo.id)
  } catch (error) {
    if (error.status === errMiddleware.notFound().status) {
      myMembership = {}
    } else {
      throw error
    }
  }

  if (!authMiddleware.haveRole(myMembership, rolesMiddleware.ADMINISTRATOR) &&
      !authMiddleware.haveRole(user, rolesMiddleware.SUPERADMINISTRATOR)) {
    throw errMiddleware.forbidden('memberGroup', 'non autorisé')
  }

  const memberGroup = {
    ...data,
  }

  await client.createMemberGroup(memberGroup)

  const memberGroupResult = await client.findOneByEdge(userFrom.id, groupTo.id)

  return {
    ...memberGroupResult,
    group: groupTo,
    user: userFrom,
  }
}
