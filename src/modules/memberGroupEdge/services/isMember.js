import joi from 'joi'

import client from 'modules/memberGroupEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'

export default async function isMember(_toGroupId, context) {
  joi.assert(_toGroupId, joi.string().required(), '_toGroupId')
  joi.assert(context, joi.object().required(), 'context')

  try {
    const user = authMiddleware.handleUser(context)

    await client.findOneByEdge(user.id, _toGroupId)

    return true
  } catch (error) {
    if (error.status === errMiddleware.notFound().status || error.status === errMiddleware.unauthorized().status) {
      return false
    }

    throw error
  }
}
