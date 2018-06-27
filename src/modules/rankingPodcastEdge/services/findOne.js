import joi from 'joi'

import client from 'modules/rankingPodcastEdge/client'

export default async function findOne(_toPodcastId, createdAt) {
  joi.assert(_toPodcastId, joi.string().required(), '_toPodcastId')
  joi.assert(createdAt, joi.string().required(), 'createdAt')

  // traitement de la date pour avoir 1er du mois
  return client.findOne(_toPodcastId, createdAt)
}
