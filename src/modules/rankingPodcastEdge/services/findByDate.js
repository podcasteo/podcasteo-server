import joi from 'joi'

import client from 'modules/rankingPodcastEdge/client'
import setPageInfo from 'helpers/setPageInfo'
import handleFirstDate from 'helpers/handleFirstDate'

export default async function findByDate(createdAt, options) {
  joi.assert(createdAt, joi.date().required(), 'createdAt')

  createdAt = handleFirstDate(createdAt) // eslint-disable-line no-param-reassign

  const parameters = await joi.validate(options, {
    first: joi.number().default(20),
    offset: joi.number().default(0),
  })
  const {
    first,
    offset,
  } = parameters
  const {
    data,
    totalCount,
  } = await client.findByDate(createdAt, parameters)

  return {
    pageInfo: setPageInfo(data, totalCount, first, offset),
    data,
  }
}
