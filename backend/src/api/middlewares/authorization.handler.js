import boom from '@hapi/boom'
import jwt from 'jsonwebtoken'
import { secretKey } from '#config/index.js'

const tokenAuthorization = (req, res, next) => {
  let token = ''
  if (req.cookies.jwt) {
    token = req.cookies.jwt
  } else {
    token = req.headers.cookies
  }

  if (!token) {
    return next(boom.unauthorized('No token provided'))
  }

  try {
    const decoded = jwt.verify(token, secretKey)
    req.userId = decoded.id
    next()
  } catch {
    return next(boom.unauthorized('Unauthorized'))
  }
}

export {
  tokenAuthorization,
}