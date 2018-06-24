import bcrypt from 'bcryptjs'
import config from 'config'
import joi from 'joi'
import jwt from 'jsonwebtoken'
import uuidv4 from 'uuid/v4'

import client from 'modules/users/client'

export default async function createUser(data) {
  await joi.validate(data, {
    email: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required(),
  })

  const salt = await bcrypt.genSalt(5)
  const hash = await bcrypt.hash(data.password, salt)
  const user = {
    id: uuidv4(),
    ...data,
    password: hash,
    createdAt: new Date().toISOString(),
  }
  const result = await client.createUser(user)
  const token = jwt.sign(
    {
      id: result.id,
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
