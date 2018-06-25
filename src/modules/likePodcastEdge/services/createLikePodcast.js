import joi from 'joi'

import client from 'modules/likePodcastEdge/client'
import podcastClient from 'modules/podcasts/client'
import authMiddleware from 'helpers/authentification'

export default async function createLikePodcast(_toPodcastId, context) {
  joi.assert(_toPodcastId, joi.string().required(), '_toPodcastId')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)
  const podcastTo = await podcastClient.findOneById(_toPodcastId)
  const likePodcast = {
    _from: user.id,
    _to: podcastTo.id,
  }

  await client.createLikePodcast(likePodcast)

  const likePodcastResult = await client.findOneByEdge(user.id, _toPodcastId)

  return {
    ...likePodcastResult,
    podcast: podcastTo,
  }
}
