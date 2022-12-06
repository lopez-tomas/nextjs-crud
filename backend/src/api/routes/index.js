import { Router } from 'express'
import { router as productsRouter } from '#routes/products.router.js'

const router = (app) => {
  const router = Router()
  app.use('/api', router)

  router.use('/products', productsRouter)
}

export {
  router
}