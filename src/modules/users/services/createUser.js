import bcrypt from 'bcryptjs'
import config from 'config'
import joi from 'joi'
import jwt from 'jsonwebtoken'
import uuidv4 from 'uuid/v4'

import client from 'modules/users/client'
import stringToSlug from 'helpers/stringToSlug'

export default async function createUser(data) {
  joi.assert(data, joi.object().keys({
    email: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required(),
  }).required(), 'dataUser')

  const salt = await bcrypt.genSalt(5)
  const hash = await bcrypt.hash(data.password, salt)
  const user = {
    ...data,
    password: hash,
  }

  if (!user.id) {
    user.id = uuidv4()
  }

  if (!user.slug) {
    user.slug = stringToSlug(user.username)
  }

  await client.createUser(user)

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
