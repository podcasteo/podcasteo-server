/* eslint-disable no-underscore-dangle */
export default class ArangoSerializer {
  static serialize(data) {
    const serializedData = {
      ...data,
    }

    delete serializedData.id

    if (data.id) {
      serializedData._key = data.id
    }

    return serializedData
  }

  static deserialize(data) {
    const serializedData = {
      ...data,
    }

    delete serializedData._key
    delete serializedData._rev

    if (data._key) {
      serializedData.id = data._key
    }

    return serializedData
  }
}
