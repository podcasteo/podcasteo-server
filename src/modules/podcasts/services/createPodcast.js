import joi from 'joi'
import uuidv4 from 'uuid/v4'

import client from 'modules/podcasts/client'
import memberPodcastClient from 'modules/memberPodcastEdge/client'
import authMiddleware from 'helpers/authentification'
import stringToSlug from 'helpers/stringToSlug'

export default async function createPodcast(data, context) {
  joi.assert(data, joi.object().keys({
    id: joi.string(),
    name: joi.string().required(),
    slug: joi.string(),
    description: joi.string(),
    categorie: joi.string(),
    region: joi.string(),
    avatar: joi.string(),
    isPodcasteo: joi.boolean(),
    haveLeadWomen: joi.boolean(),
    haveWomen: joi.boolean(),
    facebook: joi.string(),
    twitter: joi.string(),
    soundcloud: joi.string(),
    itunes: joi.string(),
  }).required(), 'dataPodcast')
  joi.assert(context, joi.object().required(), 'context')

  const user = authMiddleware.handleUser(context)

  if (!data.id) {
    data.id = uuidv4() // eslint-disable-line no-param-reassign
  }

  if (!data.slug) {
    data.slug = stringToSlug(data.name) // eslint-disable-line no-param-reassign
  }

  await client.createPodcast(data)

  try {
    await memberPodcastClient.createMemberPodcast({
      _from: user.id,
      _to: data.id,
      role: 'SUPERADMINISTRATOR',
      type: 'PRODUCER',
    })
  } catch (error) {
    await client.deletePodcast(data.id)

    throw error
  }

  return client.findOneById(data.id)
}
