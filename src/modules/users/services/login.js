import bcrypt from 'bcryptjs'
import config from 'config'
import joi from 'joi'
import jwt from 'jsonwebtoken'

import client from 'modules/users/client'
import errMiddleware from 'helpers/errors'

export default async function login(data) {
  joi.assert(data, joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
  }).required(), 'dataUser')

  try {
    const user = await client.findOneByEmail(data.email)
    const validAuth = await bcrypt.compare(data.password, user.password)

    if (!validAuth) {
      throw errMiddleware.badRequest()
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
  } catch (error) {
    throw errMiddleware.badRequest('users', 'utilisateur ou mot de passe invalide')
  }
}
