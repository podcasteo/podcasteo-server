import joi from 'joi'

import client from 'modules/podcasts/client'
import memberGroupClient from 'modules/memberPodcastEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import rolesMiddleware from 'helpers/roles'
import uploadAvatar from 'helpers/uploadAvatar'

export default async function uploadAvatarFromGraphQL(groupId, file, context) {
  joi.assert(groupId, joi.string().required(), 'groupId')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)
  let membership

  try {
    membership = await memberGroupClient.findOneByEdge(user.id, groupId)
  } catch (error) {
    if (error.status === errMiddleware.notFound().status) {
      membership = {}
    }
  }

  if (!authMiddleware.haveRole(membership, rolesMiddleware.ADMINISTRATOR) &&
      !authMiddleware.haveRole(user, rolesMiddleware.SUPERADMINISTRATOR)) {
    throw errMiddleware.forbidden()
  }

  const stream = file.buffer

  try {
    const group = await client.findOneById(groupId)
    const result = await uploadAvatar('groups', group.slug, stream)

    await client.updateGroup(groupId, {
      avatar: result.url,
    })

    return client.findOneById(groupId)
  } catch (error) {
    console.log(error) // eslint-disable-line

    throw errMiddleware.badRequest()
  }
}
