import joi from 'joi'

import client from 'modules/followUserEdge/client'
import authMiddleware from 'helpers/authentification'

export default async function isFollowing(_toUserId, context) {
  const user = authMiddleware.handleUser(context)

  joi.assert(_toUserId, joi.string().required(), '_toUserId')

  try {
    await client.findOneByEdge(user.id, _toUserId)

    return true
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return false
    }

    throw error
  }
}
