import joi from 'joi'

import client from 'modules/followUserEdge/client'
import userClient from 'modules/users/client'
import authMiddleware from 'helpers/authentification'

export default async function createFollowUser(_toUserId, context) {
  joi.assert(_toUserId, joi.string().required(), '_toUserId')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)
  const userTo = await userClient.findOneById(_toUserId)
  const followUser = {
    _from: user.id,
    _to: userTo.id,
  }

  await client.createFollowUser(followUser)

  const followUserResult = await client.findOneByEdge(user.id, _toUserId)

  return {
    ...followUserResult,
    user: userTo,
  }
}
