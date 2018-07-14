import joi from 'joi'

import client from 'modules/users/client'
import setPageInfo from 'helpers/setPageInfo'

export default async function find(options) {
  const parameters = await joi.validate(options, {
    first: joi.number().default(20),
    offset: joi.number().default(0),
    username: joi.string().allow(''),
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
