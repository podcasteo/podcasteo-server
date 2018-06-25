import joi from 'joi'

import client from 'modules/memberGroupEdge/client'
import setPageInfo from 'helpers/setPageInfo'

export default async function findByGroup(_toGroupId, options) {
  joi.assert(_toGroupId, joi.string().required(), '_toGroupId')

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
  } = await client.findByGroup(_toGroupId, parameters)

  return {
    pageInfo: setPageInfo(data, totalCount, first, offset),
    data,
  }
}
