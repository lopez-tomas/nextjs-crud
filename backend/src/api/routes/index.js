import { Router } from 'express'
import { router as authRouter } from '#routes/auth.router.js'
import { router as productsRouter } from '#routes/products.router.js'
import { router as categoriesRouter } from '#routes/categories.router.js'

const router = (app) => {
  const router = Router()
  app.use('/api', router)

  router.use('/auth', authRouter)
  router.use('/products', productsRouter)
  router.use('/categories', categoriesRouter)
}

export {
  router
}