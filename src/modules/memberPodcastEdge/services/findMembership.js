import joi from 'joi'

import client from 'modules/memberPodcastEdge/client'
import podcastServices from 'modules/podcasts/services'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'

export default async function findMembership(_toPodcastId, context) {
  joi.assert(_toPodcastId, joi.string().required(), '_toPodcastId')
  joi.assert(context, joi.object().required(), 'context')

  try {
    const user = authMiddleware.handleUser(context)
    const podcastTo = await podcastServices.findOneById(_toPodcastId)
    const myMembership = await client.findOneByEdge(user.id, _toPodcastId)

    return {
      ...myMembership,
      podcast: podcastTo,
      user: context.user,
    }
  } catch (error) {
    if (error.status === errMiddleware.notFound().status) {
      return null
    }

    throw error
  }
}
