import joi from 'joi'

import client from 'modules/likePodcastEdge/client'
import authMiddleware from 'helpers/authentification'

export default async function isLike(_toPodcastId, context) {
  joi.assert(_toPodcastId, joi.string().required(), '_toPodcastId')

  const user = authMiddleware.handleUser(context)

  try {
    await client.findOneByUsers(user.id, _toPodcastId)

    return true
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return false
    }

    throw error
  }
}
