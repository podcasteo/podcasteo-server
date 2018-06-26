import joi from 'joi'

export const edgeModel = joi.object().keys({
  _from: joi.string().required(),
  _to: joi.string().required(),
  type: joi.string().valid([
    'itunes',
    'facebook',
    'twitter',
    'soundcloud',
    'spotify',
    'youtube',
    'patreon',
  ]).required(),
  createdAt: joi.string(),
})

export const dataModel = joi.object().keys({
  trackCount: joi.number(),
  lastRelease: joi.string(),
  ratingCount: joi.number(),
  frequency: joi.number(),
  followers: joi.number(),
})

export const selector = joi.object()
