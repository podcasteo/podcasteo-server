import joi from 'joi'

import client from 'modules/groups/client'
import setPageInfo from 'helpers/setPageInfo'

export default async function findByMember(userId, options) {
  joi.assert(userId, joi.string().required(), 'userId')

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
  } = await client.findByMember(userId, parameters)

  return {
    pageInfo: setPageInfo(data, totalCount, first, offset),
    data,
  }
}
