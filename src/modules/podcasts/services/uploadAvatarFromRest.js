import joi from 'joi'

import client from 'modules/podcasts/client'
import memberPodcastClient from 'modules/memberPodcastEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import rolesMiddleware from 'helpers/roles'

export default async function uploadAvatarFromGraphQL(podcastId, file, context) {
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

  if (!authMiddleware.haveRole(membership, rolesMiddleware.ADMINISTRATOR) &&
      !authMiddleware.haveRole(user, rolesMiddleware.SUPERADMINISTRATOR)) {
    throw errMiddleware.forbidden()
  }

  const stream = file.buffer

  try {
    await client.uploadAvatar(podcastId, stream)

    return client.findOneById(podcastId)
  } catch (error) {
    console.log(error) // eslint-disable-line

    throw errMiddleware.badRequest()
  }
}
