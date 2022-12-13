import express from 'express'
import ProductsService from '#services/products.service.js'

import { validatorHandler } from '#middlewares/validator.handler.js'
import {
  getProductSchema,
  createProductSchema,
  updateProductSchema
} from '#interfaces/products/index.js'

const router = express.Router()
const productService = new ProductsService()

router.get('/', async (req, res, next) => {
  try {
    const response = await productService.getProducts()
    res.status(200).json({ products: response })
  } catch (error) {
    next(error);
  }
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params
    try {
      const response = await productService.getProduct(id)
      res.status(200).json({ product: response })
    } catch (error) {
      next(error);
    }
  }
)

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    const body = req.body

    try {
      const newProduct = await productService.createProduct(body)
      res.status(201).json(newProduct)
    } catch (error) {
      next(error);
    }
  }
)

router.patch('/',
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const body = req.body

    try {
      const response = await productService.updateProduct(body)
      res.status(202).json(response)
    } catch (error) {
      next(error);
    }
  }
)

export {
  router
}