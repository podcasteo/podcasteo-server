import joi from 'joi'

import client from 'modules/rankingPodcastEdge/client'
import handleFirstDate from 'helpers/handleFirstDate'
import errMiddleware from 'helpers/errors'

export default async function findOnePrevious(_toPodcastId, createdAt) {
  joi.assert(_toPodcastId, joi.string().required(), '_toPodcastId')
  joi.assert(createdAt, joi.string().required(), 'createdAt')

  const date = new Date(createdAt)

  date.setMonth(date.getMonth() - 1)

  if (_toPodcastId.split('/').length > 1) {
    _toPodcastId = _toPodcastId.split('/')[1] // eslint-disable-line
  }

  createdAt = handleFirstDate(date.toISOString()) // eslint-disable-line no-param-reassign

  try {
    const result = await client.findOne(_toPodcastId, createdAt)

    return result
  } catch (error) {
    if (error.status === errMiddleware.notFound().status) {
      return null
    }

    throw error
  }
}
