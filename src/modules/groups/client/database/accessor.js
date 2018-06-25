import config from 'config'

import {
  model,
  selector,
} from 'modules/groups/client/database/schema'
import ArangoAccessor from 'helpers/arangoAccessor'

export default new ArangoAccessor(config.get('arango.collections.groups'), {
  model,
  selector,
})
