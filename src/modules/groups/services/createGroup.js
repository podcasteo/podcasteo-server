import joi from 'joi'
import uuidv4 from 'uuid/v4'

import client from 'modules/groups/client'

export default async function createGroup(data) {
  await joi.validate(data, {
    id: joi.string(),
    name: joi.string().required(),
    description: joi.string(),
    avatar: joi.string(),
    facebook: joi.string(),
    twitter: joi.string(),
    soundcloud: joi.string(),
    itunes: joi.string(),
    createdAt: joi.string(),
  })

  const group = {
    ...data,
  }

  if (!group.id) {
    group.id = uuidv4()
  }

  await client.createGroup(group)

  return client.findOneById(group.id)
}
