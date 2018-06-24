import joi from 'joi'

import arango from 'clients/arango'
import ArangoSerializer from 'helpers/arangoSerializer'

export default class ArangoAccessor {
  constructor(name, options) {
    joi.assert(name, joi.string())
    joi.assert(options, joi.object().keys({
      model: joi.object(),
      selector: joi.object(),
    }).unknown())

    this.serializer = ArangoSerializer
    this.name = name
    this.model = options.model
    this.selector = options.selector
    this.client = arango.collection(name)
  }

  async insert(data) {
    const validatedData = await joi.validate(data, this.model)
    const serializedData = this.serializer.serialize(validatedData)
    const metadata = await this.client.save(serializedData)

    return this.serializer.deserialize(metadata)
  }

  async updateWhere(where, data) {
    if (!where || !data) {
      throw new Error(`no data or query for update in ${this.name}`)
    }

    const mergedData = {
      ...where,
      ...data,
    }
    const validatedData = await joi.validate(mergedData, this.selector)
    const serializedData = this.serializer.serialize(validatedData)

    if (!where.id) {
      await this.client.updateByExample(where, serializedData)
    } else {
      await this.client.update(where.id, serializedData)
    }

    return {
      code: 200,
      error: false,
      updated: true,
    }
  }

  async selectWhere(where) {
    const validatedData = await joi.validate(where, this.selector)
    let cursor
    let data

    try {
      if (!validatedData.id) {
        cursor = await this.client.byExample(validatedData)
        data = await cursor.all()
      } else {
        cursor = await this.client.document(validatedData.id)
        data = [
          cursor,
        ]
      }

      return data.map((item) => this.serializer.deserialize(item))
    } catch (error) {
      if (error.statusCode === 404) {
        return []
      }

      throw error
    }
  }

  async deleteWhere(where) {
    const validatedData = await joi.validate(where, this.selector)

    if (!validatedData.id) {
      return this.client.removeByExample(validatedData)
    }

    return this.client.remove(validatedData.id)
  }
}
