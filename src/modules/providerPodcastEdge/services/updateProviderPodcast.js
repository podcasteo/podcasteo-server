import joi from 'joi'

import client from 'modules/providerPodcastEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import handleFirstDate from 'helpers/handleFirstDate'
import rolesMiddleware from 'helpers/roles'

export default async function updateProviderPodcast(data, context) {
  joi.assert(data, joi.object().keys({
    _to: joi.string().required(),
    type: joi.string().required(),
    createdAt: joi.string().required(),
    trackCount: joi.number(),
    lastRelease: joi.string(),
    ratingCount: joi.number(),
    frequency: joi.number(),
    followers: joi.number(),
  }).required(), 'dataPodcast')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)

  if (!authMiddleware.haveRole(user, rolesMiddleware.SUPERADMINISTRATOR)) {
    throw errMiddleware.forbidden()
  }

  data.createdAt = handleFirstDate(data.createdAt) // eslint-disable-line no-param-reassign

  const {
    _to,
    type,
    createdAt,
    ...dataProvider
  } = data
  const providerPodcast = await client.findOne(_to, type, createdAt)

  await client.updateProviderPodcast(providerPodcast.data.id, dataProvider)

  return client.findOne(_to, type, createdAt)
}
