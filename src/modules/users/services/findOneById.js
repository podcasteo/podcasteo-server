import joi from 'joi'

import client from 'modules/users/client'

export default async function findOneById(id) {
  joi.assert(id, joi.string().required(), 'id')

  return client.findOneById(id)
}
