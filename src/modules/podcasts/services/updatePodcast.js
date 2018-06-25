import joi from 'joi'

import client from 'modules/podcasts/client'
import memberPodcastClient from 'modules/memberPodcastEdge/client'
import authMiddleware from 'helpers/authentification'

export default async function updatePodcast(podcastId, data, context) {
  joi.assert(podcastId, joi.string().required(), 'podcastId')
  joi.assert(data, joi.object().required(), 'dataPodcast')
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

  if (membership.role !== 'ADMINISTRATOR' && user.role !== 'SUPERADMINISTRATOR') {
    throw new Error('NOT_ALLOW')
  }

  await client.updatePodcast(podcastId, data)

  return client.findOneById(podcastId)
}
