import config from 'config'

import {
  model,
  selector,
} from 'modules/podcasts/client/database/schema'
import ArangoAccessor from 'helpers/arangoAccessor'

export default new ArangoAccessor(config.get('arango.collections.podcasts'), {
  model,
  selector,
})
