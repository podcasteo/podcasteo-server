import joi from 'joi'

import client from 'modules/memberPodcastEdge/client'
import userServices from 'modules/users/services'
import podcastServices from 'modules/podcasts/services'
import authMiddleware from 'helpers/authentification'

export default async function updateMemberPodcastRole(data, context) {
  joi.assert(data, joi.object().keys({
    _from: joi.string().required(),
    _to: joi.string().required(),
    role: joi.string().required(),
  }).required(), 'data')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)
  const memberUser = await userServices.findOneById(data._from)
  const memberPodcast = await podcastServices.findOneById(data._to)
  const membership = await client.findOneByEdge(data._from, data._to)
  let myMembership

  try {
    myMembership = await client.findOneByEdge(user.id, data._to)
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      myMembership = {}
    } else {
      throw error
    }
  }

  if (!authMiddleware.haveRole(user, 'SUPERADMINISTRATOR')) {
    if ((data.role === 'SUPERADMINISTRATOR' && !authMiddleware.haveRole(myMembership, 'SUPERADMINISTRATOR')) ||
        (data.role === 'ADMINISTRATOR' && !authMiddleware.haveRole(myMembership, 'ADMINISTRATOR'))) {
      throw new Error('NOT_ALLOW')
    }
  }

  await client.updateMemberPodcast(membership.id, {
    role: data.role,
  })

  const result = await client.findOneByEdge(data._from, data._to)

  return {
    ...result,
    podcast: memberPodcast,
    user: memberUser,
  }
}
