import bcrypt from 'bcryptjs'
import config from 'config'
import joi from 'joi'
import jwt from 'jsonwebtoken'

import client from 'modules/users/client'

export default async function login(data) {
  joi.assert(data, joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
  }).required(), 'dataUser')

  const user = await client.findOneByEmail(data.email)

  if (!user) {
    throw new Error('NOT_FOUND')
  }

  const validAuth = await bcrypt.compare(data.password, user.password)

  if (!validAuth) {
    throw new Error('INVALID_PASSWORD')
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    config.get('jwt.secretKey'),
    {
      expiresIn: config.get('jwt.expiresIn'),
    },
  )

  return {
    token,
  }
}
