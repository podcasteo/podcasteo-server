import joi from 'joi'

import client from 'modules/memberPodcastEdge/client'
import userServices from 'modules/users/services'
import podcastServices from 'modules/podcasts/services'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import rolesMiddleware from 'helpers/roles'

export default async function updateMemberPodcastType(data, context) {
  joi.assert(data, joi.object().keys({
    _from: joi.string().required(),
    _to: joi.string().required(),
    type: joi.string().required(),
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
    if (error.status === errMiddleware.notFound().status) {
      myMembership = {}
    } else {
      throw error
    }
  }

  if (data._from !== user.id) {
    if (!authMiddleware.haveRole(user, rolesMiddleware.SUPERADMINISTRATOR) &&
        !authMiddleware.haveRole(myMembership, rolesMiddleware.ADMINISTRATOR)) {
      throw errMiddleware.forbidden('memberPodcast', 'non autorisé')
    }
  }

  await client.updateMemberPodcast(membership.id, {
    type: data.type,
  })

  const result = await client.findOneByEdge(data._from, data._to)

  return {
    ...result,
    podcast: memberPodcast,
    user: memberUser,
  }
}
