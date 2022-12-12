import express from 'express'
import ProductsService from '#services/products.service.js'
import CategoriesService from '#services/categories.service.js'

import { validatorHandler } from '#middlewares/validator.handler.js'
import {
  getProductSchema,
  createProductSchema,
  updateProductSchema
} from '#interfaces/products/index.js'

const router = express.Router()
const productService = new ProductsService()
const categoryService = new CategoriesService()

router.get('/', async (req, res) => {
  try {
    const response = await productService.getProducts()
    res.status(200).json({ products: response })
  } catch (error) {
    res.status(500).json({ code: error.data.code, message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const response = await productService.getProduct(req.params.id)
    const categories = await categoryService.getCategories()

    res.status(200).json({
      product: response,
      categories: categories
    })
  } catch (error) {
    res.status(500).json({ code: error.data.code, message: error.message })
  }
})

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body

    try {
      const newProduct = await productService.createProduct(body)
      res.status(201).json(newProduct)
    } catch (error) {
      res.status(500).json({ code: error.code, message: error.message })
    }
  }
)

export {
  router
}