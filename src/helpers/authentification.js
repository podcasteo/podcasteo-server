import errMiddleware from 'helpers/errors'
import rolesMiddleware from 'helpers/roles'

function handleUser(req) {
  if (!req.user) {
    throw errMiddleware.unauthorized('authentification', 'connexion invalide')
  }

  return req.user
}

function haveRole(user, role) {
  let authorize = true

  if (!user || !user.role) {
    authorize = false
  } else if (role === rolesMiddleware.SUPERADMINISTRATOR) {
    if (user.role !== role) {
      authorize = false
    }
  } else if (role === rolesMiddleware.ADMINISTRATOR) {
    if (user.role === rolesMiddleware.STANDARD) {
      authorize = false
    }
  }

  return authorize
}

function handleRole(role, req) {
  const user = handleUser(req)

  if (!haveRole(user, role)) {
    throw errMiddleware.forbidden('roles', 'non autorisé')
  }

  return user
}

export default {
  handleUser,
  handleRole,
  haveRole,
}
