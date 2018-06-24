function handleUser(req) {
  if (!req.user) {
    throw new Error('UNAUTHORIZED')
  }

  return req.user
}

function handleRole(role, req) {
  const user = handleUser(req)
  let authorize = true

  if (role === 'SUPERADMIN') {
    if (user.role !== role) {
      authorize = false
    }
  } else if (role === 'ADMIN') {
    if (user.role === 'USER') {
      authorize = false
    }
  }

  if (!authorize) {
    throw new Error('NOT_ALLOW')
  }
}

export default {
  handleUser,
  handleRole,
}
