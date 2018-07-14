import joi from 'joi'

import client from 'modules/likePodcastEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'

export default async function isLike(_toPodcastId, context) {
  joi.assert(_toPodcastId, joi.string().required(), '_toPodcastId')

  try {
    const user = authMiddleware.handleUser(context)

    await client.findOneByEdge(user.id, _toPodcastId)

    return true
  } catch (error) {
    if (error.status === errMiddleware.notFound().status || error.status === errMiddleware.unauthorized().status) {
      return false
    }

    throw error
  }
}
