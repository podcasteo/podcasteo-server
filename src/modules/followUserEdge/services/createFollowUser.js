import joi from 'joi'

import client from 'modules/followUserEdge/client'
import userServices from 'modules/users/services'
import authMiddleware from 'helpers/authentification'

export default async function createFollowUser(_toUserId, context) {
  const user = authMiddleware.handleUser(context)

  joi.assert(_toUserId, joi.string().required(), '_toUserId')

  const userTo = await userServices.findOneById(_toUserId)
  const followUser = {
    _from: user.id,
    _to: userTo.id,
    createdAt: new Date().toISOString(),
  }

  await client.createFollowUser(followUser)

  const followUserResult = await client.findOneByEdge(user.id, _toUserId)

  return {
    ...followUserResult,
    user: userTo,
  }
}
