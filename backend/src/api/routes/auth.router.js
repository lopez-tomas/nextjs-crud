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
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1d' })

    res.cookie('jwt', token, {
      path: '/',
      httpOnly: true,
      secure: config.env === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.status(200).json({ user, token })
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

export {
  router
}