import joi from 'joi'
import jwt from 'jsonwebtoken'
import config from 'config'
import uuidv4 from 'uuid/v4'

import client from 'modules/users/client'

export default async function handleFacebookUser(data) {
  joi.assert(data, joi.object().keys({
    facebookId: joi.string().required(),
  }).unknown().required(), 'data')

  let user = data

  try {
    user = await client.findOneByFacebookId(data.facebookId)
  } catch (error) {
    if (!user.id) {
      user.id = uuidv4()
    }

    await client.createUser(user)
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
