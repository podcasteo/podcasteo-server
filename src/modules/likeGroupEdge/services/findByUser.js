import joi from 'joi'

import client from 'modules/likeGroupEdge/client'
import setPageInfo from 'helpers/setPageInfo'

export default async function findByUser(_fromUserId, options) {
  joi.assert(_fromUserId, joi.string().required(), '_fromUserId')

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
  } = await client.findByUser(_fromUserId, parameters)

  return {
    pageInfo: setPageInfo(data, totalCount, first, offset),
    data,
  }
}
