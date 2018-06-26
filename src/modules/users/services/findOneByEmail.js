import joi from 'joi'

import client from 'modules/users/client'

export default async function findOneByEmail(email) {
  joi.assert(email, joi.string().required(), 'email')

  return client.findOneByEmail(email)
}
