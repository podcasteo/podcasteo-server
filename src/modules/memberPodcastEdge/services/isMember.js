import joi from 'joi'

import client from 'modules/memberPodcastEdge/client'
import authMiddleware from 'helpers/authentification'

export default async function isMember(_toPodcastId, context) {
  joi.assert(_toPodcastId, joi.string().required(), '_toPodcastId')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)

  try {
    await client.findOneByEdge(user.id, _toPodcastId)

    return true
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return false
    }

    throw error
  }
}
