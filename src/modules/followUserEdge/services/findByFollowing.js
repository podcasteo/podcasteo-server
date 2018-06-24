import joi from 'joi'

import client from 'modules/followUserEdge/client'
import setPageInfo from 'helpers/setPageInfo'

export default async function findByFollowing(_toUserId, options) {
  joi.assert(_toUserId, joi.string().required(), '_toUserId')

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
  } = await client.findByFollowing(_toUserId, parameters)

  return {
    pageInfo: setPageInfo(data, totalCount, first, offset),
    data,
  }
}
