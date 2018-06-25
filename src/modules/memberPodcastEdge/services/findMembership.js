import joi from 'joi'

import client from 'modules/memberPodcastEdge/client'
import podcastServices from 'modules/podcasts/services'
import authMiddleware from 'helpers/authentification'

export default async function findMembership(_toPodcastId, context) {
  joi.assert(_toPodcastId, joi.string().required(), '_toPodcastId')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)

  try {
    const podcastTo = await podcastServices.findOneById(_toPodcastId)
    const myMembership = await client.findOneByEdge(user.id, _toPodcastId)

    return {
      ...myMembership,
      podcast: podcastTo,
      user: context.user,
    }
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return null
    }

    throw error
  }
}
