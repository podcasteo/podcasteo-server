import joi from 'joi'

import client from 'modules/memberGroupEdge/client'
import groupServices from 'modules/groups/services'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'

export default async function findMembership(_toGroupId, context) {
  joi.assert(_toGroupId, joi.string().required(), '_toGroupId')
  joi.assert(context, joi.object().required(), 'context')

  try {
    const user = authMiddleware.handleUser(context)
    const groupTo = await groupServices.findOneById(_toGroupId)
    const myMembership = await client.findOneByEdge(user.id, _toGroupId)

    return {
      ...myMembership,
      group: groupTo,
      user: context.user,
    }
  } catch (error) {
    if (error.status === errMiddleware.notFound().status) {
      return null
    }

    throw error
  }
}
