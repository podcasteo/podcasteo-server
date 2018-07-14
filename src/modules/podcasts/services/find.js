import joi from 'joi'

import client from 'modules/podcasts/client'
import setPageInfo from 'helpers/setPageInfo'

export default async function find(options) {
  const parameters = await joi.validate(options, {
    first: joi.number().default(20),
    offset: joi.number().default(0),
    name: joi.string().allow(''),
    haveLeadWomen: joi.boolean(),
    haveWomen: joi.boolean(),
    isPodcasteo: joi.boolean(),
  })
  const {
    first,
    offset,
  } = parameters
  const {
    data,
    totalCount,
  } = await client.find(parameters)

  return {
    pageInfo: setPageInfo(data, totalCount, first, offset),
    data,
  }
}
