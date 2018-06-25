import joi from 'joi'

import client from 'modules/podcasts/client'
import memberPodcastClient from 'modules/memberPodcastEdge/client'
import likePodcastClient from 'modules/likePodcastEdge/client'
import authMiddleware from 'helpers/authentification'

export default async function deletePodcast(podcastId, context) {
  joi.assert(podcastId, joi.string().required(), 'podcastId')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)
  let membership

  try {
    membership = await memberPodcastClient.findOneByEdge(user.id, podcastId)
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      membership = {}
    }
  }

  if (membership.role !== 'SUPERADMINISTRATOR' && user.role !== 'SUPERADMINISTRATOR') {
    throw new Error('NOT_ALLOW')
  }

  // delete podcast - memberEdge - likeEdge - groupEdge
  await likePodcastClient.deleteLikePodcastByPodcast(podcastId)
  await memberPodcastClient.deleteMemberPodcastByPodcast(podcastId)
  await client.deletePodcast(podcastId)

  return {
    result: 'ok',
  }
}
