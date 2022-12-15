import express from 'express'
import jwt from 'jsonwebtoken'
import LoginService from '#services/login.service.js'

import { secretKey, config } from '#config/index.js'

const router = express.Router()
const service = new LoginService()

router.post('/', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await service.getUser(username, password)
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1d' })

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: config.env === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
})

export {
  router
}