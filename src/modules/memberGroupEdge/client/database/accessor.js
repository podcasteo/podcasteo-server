import config from 'config'

import {
  model,
  selector,
} from 'modules/memberGroupEdge/client/database/schema'
import ArangoAccessor from 'helpers/arangoAccessor'

export default new ArangoAccessor(config.get('arango.collections.memberGroupEdge'), {
  model,
  selector,
})
