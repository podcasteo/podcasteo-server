import joi from 'joi'
import isEmpty from 'lodash/isEmpty'

import client from 'modules/likeGroupEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import rolesMiddleware from 'helpers/roles'

export default async function deleteLikeGroup(options, context) {
  joi.assert(options, joi.object().keys({
    id: joi.string(),
    _from: joi.string(),
    _to: joi.string().required(),
  }).required(), 'data')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)
  let result = null

  if (isEmpty(options._from)) {
    options._from = user.id // eslint-disable-line no-param-reassign
  }

  if (options._from !== user.id) {
    if (!authMiddleware.haveRole(user, rolesMiddleware.ADMINISTRATOR)) {
      throw errMiddleware.forbidden('likeGroup', 'non autorisé')
    }
  }

  if (!options.id) {
    result = await client.deleteLikeGroupByEdge(options._from, options._to)
  } else {
    result = await client.deleteLikeGroup(options.id)
  }

  return result
}
