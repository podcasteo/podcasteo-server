import config from 'config'
import get from 'lodash/get'
import {
  Database,
} from 'arangojs'

class ArangoClient {
  constructor(options) {
    const instance = new Database(get(options, 'host'))

    instance.useBasicAuth(get(options, 'user.login', 'root'), get(options, 'user.password', 'root'))

    this.client = instance.useDatabase(get(options, 'database'))

    return this.client
  }
}

const options = {
  host: config.get('arango.host'),
  database: config.get('arango.database'),
  user: config.get('arango.user'),
}

export default new ArangoClient(options)
