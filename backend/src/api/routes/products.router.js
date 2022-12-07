import express from 'express'
import ProductsService from '#services/products.service.js'

const router = express.Router()
const service = new ProductsService()

router.get('/', async (req, res) => {
  try {
    const response = await service.getProducts()
    res.status(200).json({ products: response })
  } catch (error) {
    res.status(500).json({ code: error.data.code, message: error.message })
  }
})

export {
  router
}