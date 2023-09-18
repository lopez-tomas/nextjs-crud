import express from 'express'
import jwt from 'jsonwebtoken'
import AuthService from '#services/auth.service.js'
import { tokenAuthorization } from '#middlewares/authorization.handler.js'
import { secretKey, config } from '#config/index.js'

const router = express.Router()
const service = new AuthService()

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await service.getUser(username, password)
    const token = jwt.sign(user, secretKey, { expiresIn: '1d' })

    res.cookie('jwt', token, {
      path: '/',
      httpOnly: true,
      secure: config.env === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
})

router.get('/logout',
  tokenAuthorization,
  async (req, res, next) => {
    res.clearCookie('jwt')

    return res.status(200).json({ message: 'Logout successful' })
})

router.get('/validateToken', (req, res, next) => {
  let token = ''
  if (req.cookies.jwt) {
    token = req.cookies.jwt
  } else {
    token = req.headers.cookies
  }

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, secretKey)
    req.userId = decoded.id
    res.status(200).json({ data: decoded })
  } catch {
    next(error)
  }
})

router.get('/tokenData',
  tokenAuthorization,
  async (req, res, next) => {
    try {
      const token = req.cookies.jwt
      const decoded = jwt.verify(token, secretKey)
      res.status(200).json({ data: decoded })
    } catch (error) {
      next(error)
    }
  }
)

export {
  router
}