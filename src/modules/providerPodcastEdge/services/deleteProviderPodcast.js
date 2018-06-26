import joi from 'joi'

import client from 'modules/providerPodcastEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import rolesMiddleware from 'helpers/roles'

export default async function deleteProviderPodcast(options, context) {
  joi.assert(options, joi.object().keys({
    _to: joi.string().required(),
    type: joi.string().required(),
    createdAt: joi.string().required(),
  }).required(), 'deleteProviderPodcastData')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)

  if (!authMiddleware.haveRole(user, rolesMiddleware.SUPERADMINISTRATOR)) {
    throw errMiddleware.forbidden()
  }

  const {
    _to,
    type,
    createdAt,
  } = options
  const providerPodcast = await client.findOne(_to, type, createdAt)

  return client.deleteProviderPodcast(providerPodcast.data.id)
}
