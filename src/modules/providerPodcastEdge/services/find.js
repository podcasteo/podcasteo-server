import joi from 'joi'

import client from 'modules/providerPodcastEdge/client'
import setPageInfo from 'helpers/setPageInfo'

export default async function find(_toPodcastId, options) {
  joi.assert(_toPodcastId, joi.string().required(), '_toPodcastId')

  const parameters = await joi.validate(options, {
    first: joi.number().default(20),
    offset: joi.number().default(0),
    type: joi.string(),
  })
  const {
    first,
    offset,
  } = parameters
  const {
    data,
    totalCount,
  } = await client.find(_toPodcastId, parameters)

  return {
    pageInfo: setPageInfo(data, totalCount, first, offset),
    data,
  }
}
