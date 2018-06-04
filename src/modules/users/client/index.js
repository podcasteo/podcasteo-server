import find from 'lodash/find'

import users from 'modules/users/fixtures/users'

function findAll() {
  // use db call mongoose-arangojs...etc here
  return users // eslint-disable-line
}

function findById(id) {
  // use db call mongoose-arangojs...etc here
  return find(users, (user) => (user.id === id))// eslint-disable-line
}

export default {
  find: findAll,
  findById,
}
