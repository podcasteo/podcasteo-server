import joi from 'joi'
import uuidv4 from 'uuid/v4'

import client from 'modules/groups/client'
import memberGroupClient from 'modules/memberGroupEdge/client'
import authMiddleware from 'helpers/authentification'
import stringToSlug from 'helpers/stringToSlug'
import rolesMiddleware from 'helpers/roles'

export default async function createGroup(data, context) {
  joi.assert(data, joi.object().keys({
    id: joi.string(),
    name: joi.string().required(),
    slug: joi.string(),
    description: joi.string(),
    avatar: joi.string(),
    facebook: joi.string(),
    twitter: joi.string(),
    soundcloud: joi.string(),
    itunes: joi.string(),
  }).required(), 'dataGroup')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)

  if (!data.id) {
    data.id = uuidv4() // eslint-disable-line no-param-reassign
  }

  if (!data.slug) {
    data.slug = stringToSlug(data.name) // eslint-disable-line no-param-reassign
  }

  await client.createGroup(data)

  await memberGroupClient.createMemberGroup({
    _from: user.id,
    _to: data.id,
    role: rolesMiddleware.SUPERADMINISTRATOR,
    type: 'MANAGER',
  })

  return client.findOneById(data.id)
}
