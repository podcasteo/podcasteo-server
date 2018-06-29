import joi from 'joi'

import client from 'modules/providerPodcastEdge/client'
import handleFirstDate from 'helpers/handleFirstDate'

export default async function findOne(_toPodcastId, providerType, createdAt) {
  joi.assert(_toPodcastId, joi.string().required(), '_toPodcastId')
  joi.assert(providerType, joi.string().required(), 'providerType')
  joi.assert(createdAt, joi.string().required(), 'createdAt')

  createdAt = handleFirstDate(createdAt) // eslint-disable-line no-param-reassign

  // traitement de la date pour avoir 1er du mois
  return client.findOne(_toPodcastId, providerType, createdAt)
}
