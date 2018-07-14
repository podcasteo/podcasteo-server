import joi from 'joi'

import client from 'modules/likeGroupEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'

export default async function isLike(_toGroupId, context) {
  joi.assert(_toGroupId, joi.string().required(), '_toGroupId')

  try {
    const user = authMiddleware.handleUser(context)

    await client.findOneByEdge(user.id, _toGroupId)

    return true
  } catch (error) {
    if (error.status === errMiddleware.notFound().status || error.status === errMiddleware.unauthorized().status) {
      return false
    }

    throw error
  }
}
