import joi from 'joi'

import client from 'modules/users/client'
import setPageInfo from 'helpers/setPageInfo'

export default async function find(research = {}) {
  const parameters = await joi.validate(research, {
    first: joi.number().default(20),
    offset: joi.number().default(0),
    username: joi.string(),
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
