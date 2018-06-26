import joi from 'joi'

import client from 'modules/followUserEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'

export default async function isFollower(_fromUserId, context) {
  joi.assert(_fromUserId, joi.string().required(), '_fromUserId')
  joi.assert(context, joi.object().required(), 'context')

  try {
    const user = authMiddleware.handleUser(context)

    await client.findOneByEdge(_fromUserId, user.id)

    return true
  } catch (error) {
    if (error.status === errMiddleware.notFound().status || error.status === errMiddleware.unauthorized().status) {
      return false
    }

    throw error
  }
}
