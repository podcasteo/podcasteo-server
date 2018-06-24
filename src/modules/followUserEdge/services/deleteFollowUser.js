import joi from 'joi'
import isEmpty from 'lodash/isEmpty'

import client from 'modules/followUserEdge/client'
import authMiddleware from 'helpers/authentification'

export default async function deleteFollowUser(options, context) {
  const user = authMiddleware.handleUser(context)
  let result = null

  await joi.validate(options, {
    from: joi.string(),
    to: joi.string(),
  })

  if (isEmpty(options.from)) {
    options.from = user.id // eslint-disable-line no-param-reassign
  }

  if (options.from !== user.id && user.role !== 'ADMINISTRATOR') {
    throw new Error('NOT_ALLOW')
  }

  if (!options.id) {
    result = await client.deleteFollowUserByEdge(options.from, options.to)
  } else {
    result = await client.deleteFollowUser(options.id)
  }

  return result
}
