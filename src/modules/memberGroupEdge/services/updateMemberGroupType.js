import joi from 'joi'

import client from 'modules/memberGroupEdge/client'
import userServices from 'modules/users/services'
import groupServices from 'modules/groups/services'
import authMiddleware from 'helpers/authentification'

export default async function updateMemberGroupType(data, context) {
  joi.assert(data, joi.object().keys({
    _from: joi.string().required(),
    _to: joi.string().required(),
    type: joi.string().required(),
  }).required(), 'data')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)
  const memberUser = await userServices.findOneById(data._from)
  const memberGroup = await groupServices.findOneById(data._to)
  const membership = await client.findOneByEdge(data._from, data._to)
  let myMembership

  try {
    myMembership = await client.findOneByEdge(user.id, data._to)
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      myMembership = {}
    } else {
      throw error
    }
  }

  if (!authMiddleware.haveRole(user, 'SUPERADMINISTRATOR') && !authMiddleware.haveRole(myMembership, 'ADMINISTRATOR')) {
    throw new Error('NOT_ALLOW')
  }

  await client.updateMemberGroup(membership.id, {
    type: data.type,
  })

  const result = await client.findOneByEdge(data._from, data._to)

  return {
    ...result,
    group: memberGroup,
    user: memberUser,
  }
}
