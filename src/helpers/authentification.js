function handleUser(req) {
  if (!req.user) {
    throw new Error('UNAUTHORIZED')
  }

  return req.user
}

function haveRole(user, role) {
  let authorize = true

  if (!user || !user.role) {
    authorize = false
  } else if (role === 'SUPERADMINISTRATOR') {
    if (user.role !== role) {
      authorize = false
    }
  } else if (role === 'ADMINISTRATOR') {
    if (user.role === 'SIMPLE') {
      authorize = false
    }
  }

  return authorize
}

function handleRole(role, req) {
  const user = handleUser(req)

  if (!haveRole(user, role)) {
    throw new Error('NOT_ALLOW')
  }

  return user
}

export default {
  handleUser,
  handleRole,
  haveRole,
}
