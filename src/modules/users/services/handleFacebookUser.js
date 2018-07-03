import path from 'path'

import config from 'config'
import joi from 'joi'
import jwt from 'jsonwebtoken'
import fetch from 'node-fetch'
import uuidv4 from 'uuid/v4'

import s3Bucket from 'clients/aws'
import client from 'modules/users/client'
import stringToSlug from 'helpers/stringToSlug'

export default async function handleFacebookUser(data) {
  joi.assert(data, joi.object().keys({
    facebookId: joi.string().required(),
    facebookAvatar: joi.string(),
  }).unknown().required(), 'data')

  let {
    facebookAvatar, // eslint-disable-line
    ...user
  } = data

  try {
    user = await client.findOneByFacebookId(data.facebookId)
  } catch (error) {
    if (!user.id) {
      user.id = uuidv4()
    }

    if (!user.slug) {
      user.slug = stringToSlug(user.username || `${user.firstname}.${user.lastname}`)
    }

    await client.createUser(user)

    if (facebookAvatar) {
      const stream = await fetch(facebookAvatar)
      const uri = path.join('users', user.id, 'avatar', 'default.jpg')

      try {
        await s3Bucket.upload({
          Key: uri,
          Body: stream.body,
          ContentType: 'image/jpeg',
        }).promise()
      } catch (errorImg) {
        console.log(errorImg) // eslint-disable-line
      }
    }
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
