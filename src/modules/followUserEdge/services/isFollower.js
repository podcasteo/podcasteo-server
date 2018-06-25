import joi from 'joi'

import client from 'modules/followUserEdge/client'
import authMiddleware from 'helpers/authentification'

export default async function isFollower(_fromUserId, context) {
  joi.assert(_fromUserId, joi.string().required(), '_fromUserId')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)

  try {
    await client.findOneByEdge(_fromUserId, user.id)

    return true
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return false
    }

    throw error
  }
}
