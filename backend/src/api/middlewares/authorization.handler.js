import boom from '@hapi/boom'
import { secretKey } from '#config/index.js'

const tokenAuthorization = (req, res, next) => {
  const token = req.cookies['jwt']
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