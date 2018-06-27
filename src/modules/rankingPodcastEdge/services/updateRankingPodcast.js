import joi from 'joi'

import client from 'modules/rankingPodcastEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import rolesMiddleware from 'helpers/roles'

export default async function updateRankingPodcast(data, context) {
  joi.assert(data, joi.object().keys({
    _to: joi.string().required(),
    createdAt: joi.string().required(),
    score: joi.number(),
    ranking: joi.number(),
    audienceScore: joi.number(),
    audienceGrade: joi.string(),
    frequencyScore: joi.number(),
    frequencyGrade: joi.string(),
    networkScore: joi.number(),
    networkGrade: joi.string(),
    itunesScore: joi.number(),
    itunesGrade: joi.string(),
    traineeScore: joi.number(),
    traineeGrade: joi.string(),
  }).required(), 'dataPodcast')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)

  if (!authMiddleware.haveRole(user, rolesMiddleware.SUPERADMINISTRATOR)) {
    throw errMiddleware.forbidden()
  }

  const {
    _to,
    createdAt,
    ...dataProvider
  } = data
  const rankingPodcast = await client.findOne(_to, createdAt)

  await client.updateRankingPodcast(rankingPodcast.data.id, dataProvider)

  return client.findOne(_to, createdAt)
}