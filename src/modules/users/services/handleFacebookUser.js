import config from 'config'
import joi from 'joi'
import jwt from 'jsonwebtoken'
import fetch from 'node-fetch'
import uuidv4 from 'uuid/v4'

import client from 'modules/users/client'
import stringToSlug from 'helpers/stringToSlug'
import uploadAvatar from 'helpers/uploadAvatar'

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
      try {
        const imgData = await fetch(facebookAvatar)
        const result = await uploadAvatar('users', user.slug, imgData.body, true)

        await client.updateUser(user.id, {
          avatar: result.url,
        })
      } catch (imgError) {
        console.log(imgError) // eslint-disable-line
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
