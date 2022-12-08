import express from 'express'
import CategoriesService from '#services/categories.service.js'

const router = express.Router()
const service = new CategoriesService()

router.get('/', async (req, res) => {
  try {
    const response = await service.getCategories()
    res.status(200).json({ categories: response })
  } catch (err) {
    res.status(500).json({ code: err.data.code, message: err.message })
  }
})

export {
  router
}