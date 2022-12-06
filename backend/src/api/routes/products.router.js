import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
  res.status(200).json({
    products: [
      { id: 1, name: 'Almendras', category: 'Baldes', quantity: 5 },
      { id: 2, name: 'Americana', category: 'Baldes', quantity: 10 },
      { id: 3, name: 'Ananá', category: 'Baldes', quantity: 2 }
    ]
  })
})

export {
  router
}