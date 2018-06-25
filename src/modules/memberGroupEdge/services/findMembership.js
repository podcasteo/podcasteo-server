import joi from 'joi'

import client from 'modules/memberGroupEdge/client'
import groupServices from 'modules/groups/services'
import authMiddleware from 'helpers/authentification'

export default async function findMembership(_toGroupId, context) {
  joi.assert(_toGroupId, joi.string().required(), '_toGroupId')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)

  try {
    const groupTo = await groupServices.findOneById(_toGroupId)
    const memberShip = await client.findOneByEdge(user.id, _toGroupId)

    return {
      ...memberShip,
      group: groupTo,
      user: context.user,
    }
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return null
    }

    throw error
  }
}
