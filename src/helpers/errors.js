function badRequest(model, message) {
  const error = new Error()

  error.message = message || 'BAD_REQUEST'
  error.status = 400
  error.model = model

  return error
}

function unauthorized(model, message) {
  const error = new Error()

  error.message = message || 'UNAUTHORIZED'
  error.status = 401
  error.model = model

  return error
}

function forbidden(model, message) {
  const error = new Error()

  error.message = message || 'FORBIDDEN'
  error.status = 403
  error.model = model

  return error
}

function notFound(model, message) {
  const error = new Error()

  error.message = message || 'NOT_FOUND'
  error.status = 404
  error.model = model

  return error
}

export default {
  badRequest,
  unauthorized,
  forbidden,
  notFound,
}
