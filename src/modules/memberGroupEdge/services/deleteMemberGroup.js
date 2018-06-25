import joi from 'joi'
import isEmpty from 'lodash/isEmpty'

import client from 'modules/memberGroupEdge/client'
import authMiddleware from 'helpers/authentification'

export default async function deleteMemberGroup(options, context) {
  joi.assert(options, joi.object().keys({
    _from: joi.string(),
    _to: joi.string().required(),
  }).required(), 'data')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)
  let myMembership
  let result

  if (isEmpty(options._from)) {
    options._from = user.id // eslint-disable-line no-param-reassign
  }

  try {
    myMembership = await client.findOneByEdge(user.id, options._to)
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      myMembership = {}
    } else {
      throw error
    }
  }

  if (options._from !== user.id) {
    if (!authMiddleware.haveRole(myMembership, 'ADMINISTRATOR') && !authMiddleware.haveRole(user, 'SUPERADMINISTRATOR')) {
      throw new Error('NOT_ALLOW')
    }
  }

  if (!options.id) {
    result = await client.deleteMemberGroupByEdge(options._from, options._to)
  } else {
    result = await client.deleteLikeGroup(options.id)
  }

  return result
}
