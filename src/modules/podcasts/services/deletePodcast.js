import joi from 'joi'

import client from 'modules/podcasts/client'
import memberPodcastClient from 'modules/memberPodcastEdge/client'
import likePodcastClient from 'modules/likePodcastEdge/client'
import providerPodcastClient from 'modules/providerPodcastEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import rolesMiddleware from 'helpers/roles'

export default async function deletePodcast(podcastId, context) {
  joi.assert(podcastId, joi.string().required(), 'podcastId')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)
  let membership

  try {
    membership = await memberPodcastClient.findOneByEdge(user.id, podcastId)
  } catch (error) {
    if (error.status === errMiddleware.notFound().status) {
      membership = {}
    }
  }

  if (!authMiddleware.haveRole(membership, rolesMiddleware.SUPERADMINISTRATOR) &&
      !authMiddleware.haveRole(user, rolesMiddleware.SUPERADMINISTRATOR)) {
    throw errMiddleware.forbidden()
  }

  // delete podcast - memberEdge - likeEdge - groupEdge
  await likePodcastClient.deleteLikePodcastByPodcast(podcastId)
  await providerPodcastClient.deleteProviderPodcastByPodcast(podcastId)
  await memberPodcastClient.deleteMemberPodcastByPodcast(podcastId)
  await client.deletePodcast(podcastId)

  return {
    result: 'ok',
  }
}
