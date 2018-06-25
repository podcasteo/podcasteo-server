import joi from 'joi'

import client from 'modules/memberPodcastEdge/client'
import podcastClient from 'modules/podcasts/client'
import userClient from 'modules/users/client'
import authMiddleware from 'helpers/authentification'

export default async function createMemberPodcast(data, context) {
  joi.assert(data, joi.object().keys({
    _from: joi.string().required(),
    _to: joi.string().required(),
    role: joi.string().invalid('SUPERADMINISTRATOR'),
    type: joi.string(),
  }).required(), 'data')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)
  const userFrom = await userClient.findOneById(data._from)
  const podcastTo = await podcastClient.findOneById(data._to)
  let myMembership

  try {
    myMembership = await client.findOneByEdge(user.id, podcastTo.id)
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      myMembership = {}
    } else {
      throw error
    }
  }

  if (!authMiddleware.haveRole(myMembership, 'ADMINISTRATOR') && !authMiddleware.haveRole(user, 'SUPERADMINISTRATOR')) {
    throw new Error('NOT_ALLOW')
  }

  const memberPodcast = {
    ...data,
  }

  await client.createMemberPodcast(memberPodcast)

  const memberPodcastResult = await client.findOneByEdge(userFrom.id, podcastTo.id)

  return {
    ...memberPodcastResult,
    podcast: podcastTo,
    user: userFrom,
  }
}
