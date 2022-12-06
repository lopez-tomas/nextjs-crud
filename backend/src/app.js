import express from 'express'
import { router } from '#routes/index.js'
import { config } from '#config/index.js'

const app = express()
const port = config.port
const env = config.env

app.use(express.json())

// cors
// app.use(cors(options))

app.get('/', (req, res) => {
  res.send(`
    Routes:<br />
    /api/products<br />
  `)
})

router(app)

app.listen(port, () => {
  env == 'dev' && console.log(`Listening at http://localhost:${port}`)
})
