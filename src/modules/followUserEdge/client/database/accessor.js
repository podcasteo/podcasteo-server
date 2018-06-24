import config from 'config'

import {
  model,
  selector,
} from 'modules/followUserEdge/client/database/schema'
import ArangoAccessor from 'helpers/arangoAccessor'

export default new ArangoAccessor(config.get('arango.collections.followUserEdge'), {
  model,
  selector,
})
