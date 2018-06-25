import joi from 'joi'

import client from 'modules/memberGroupEdge/client'
import groupClient from 'modules/groups/client'
import userClient from 'modules/users/client'
import authMiddleware from 'helpers/authentification'

export default async function createMemberGroup(data, context) {
  joi.assert(data, joi.object().keys({
    _from: joi.string().required(),
    _to: joi.string().required(),
    role: joi.string().invalid('SUPERADMINISTRATOR'),
    type: joi.string(),
  }).required(), 'data')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)
  const userFrom = await userClient.findOneById(data._from)
  const groupTo = await groupClient.findOneById(data._to)
  let memberShip

  try {
    memberShip = await client.findOneByEdge(user.id, groupTo.id)
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      memberShip = {}
    } else {
      throw error
    }
  }

  if (!authMiddleware.haveRole(memberShip, 'ADMINISTRATOR') && !authMiddleware.haveRole(user, 'SUPERADMINISTRATOR')) {
    throw new Error('NOT_ALLOW')
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
