import joi from 'joi'

import client from 'modules/likeGroupEdge/client'
import groupClient from 'modules/groups/client'
import authMiddleware from 'helpers/authentification'

export default async function createLikeGroup(_toGroupId, context) {
  joi.assert(_toGroupId, joi.string().required(), '_toGroupId')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)
  const groupTo = await groupClient.findOneById(_toGroupId)
  const likeGroup = {
    _from: user.id,
    _to: groupTo.id,
  }

  await client.createLikeGroup(likeGroup)

  const likeGroupResult = await client.findOneByEdge(user.id, _toGroupId)

  return {
    ...likeGroupResult,
    group: groupTo,
  }
}
