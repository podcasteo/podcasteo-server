import joi from 'joi'

export const edgeModel = joi.object().keys({
  _from: joi.string().required(),
  _to: joi.string().required(),
  createdAt: joi.string(),
})

export const dataModel = joi.object().keys({
  score: joi.number(),
  ranking: joi.number(),
  audienceScore: joi.number(),
  audienceGrade: joi.string(),
  frequencyScore: joi.number(),
  frequencyGrade: joi.string(),
  networkScore: joi.number(),
  networkGrade: joi.string(),
  itunesScore: joi.number(),
  itunesGrade: joi.string(),
  traineeScore: joi.number(),
  traineeGrade: joi.string(),
})

export const selector = joi.object()
