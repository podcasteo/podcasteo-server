import joi from 'joi'

import client from 'modules/likeGroupEdge/client'
import authMiddleware from 'helpers/authentification'

export default async function isLike(_toGroupId, context) {
  joi.assert(_toGroupId, joi.string().required(), '_toGroupId')

  const user = authMiddleware.handleUser(context)

  try {
    await client.findOneByUsers(user.id, _toGroupId)

    return true
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return false
    }

    throw error
  }
}
