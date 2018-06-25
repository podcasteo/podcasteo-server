import joi from 'joi'

import client from 'modules/memberGroupEdge/client'
import authMiddleware from 'helpers/authentification'

export default async function isMember(_toGroupId, context) {
  joi.assert(_toGroupId, joi.string().required(), '_toGroupId')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)

  try {
    await client.findOneByEdge(user.id, _toGroupId)

    return true
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return false
    }

    throw error
  }
}
