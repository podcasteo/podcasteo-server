import joi from 'joi'

import client from 'modules/rankingPodcastEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import rolesMiddleware from 'helpers/roles'

export default async function deleteRankingPodcast(options, context) {
  joi.assert(options, joi.object().keys({
    _to: joi.string().required(),
    createdAt: joi.string().required(),
  }).required(), 'deleteRankingPodcastData')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)

  if (!authMiddleware.haveRole(user, rolesMiddleware.SUPERADMINISTRATOR)) {
    throw errMiddleware.forbidden()
  }

  const {
    _to,
    createdAt,
  } = options
  const rankingPodcast = await client.findOne(_to, createdAt)

  return client.deleteRankingPodcast(rankingPodcast.data.id)
}
