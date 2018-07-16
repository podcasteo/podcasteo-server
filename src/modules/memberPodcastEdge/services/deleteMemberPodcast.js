import joi from 'joi'
import isEmpty from 'lodash/isEmpty'

import client from 'modules/memberPodcastEdge/client'
import authMiddleware from 'helpers/authentification'
import errMiddleware from 'helpers/errors'
import rolesMiddleware from 'helpers/roles'

export default async function deleteMemberPodcast(options, context) {
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
    if (error.status === errMiddleware.notFound().status) {
      myMembership = {}
    } else {
      throw error
    }
  }

  if (options._from !== user.id) {
    if (!authMiddleware.haveRole(myMembership, rolesMiddleware.ADMINISTRATOR) &&
        !authMiddleware.haveRole(user, rolesMiddleware.SUPERADMINISTRATOR)) {
      throw errMiddleware.forbidden('memberPodcast', 'non autorisé')
    }
  }

  if (!options.id) {
    result = await client.deleteMemberPodcastByEdge(options._from, options._to)
  } else {
    result = await client.deleteLikePodcast(options.id)
  }

  return result
}
