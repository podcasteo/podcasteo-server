import joi from 'joi'

import client from 'modules/followUserEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'

export default async function isFollowing(_toUserId, context) {
  joi.assert(_toUserId, joi.string().required(), '_toUserId')
  joi.assert(context, joi.object().required(), 'context')

  try {
    const user = authMiddleware.handleUser(context)

    await client.findOneByEdge(user.id, _toUserId)

    return true
  } catch (error) {
    if (error.status === errMiddleware.notFound().status || error.status === errMiddleware.unauthorized().status) {
      return false
    }

    throw error
  }
}
