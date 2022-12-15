import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { router } from '#routes/index.js'
import { config } from '#config/index.js'
import { logErrors, errorHandler, boomErrorHandler } from '#middlewares/error.handler.js';

const app = express()
const port = config.port
const env = config.env

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const whiteList = ['http://localhost:3000']
const options = {
  credentials: true,
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Origin not allowed: ' + origin))
    }
  }
}

app.use(cookieParser())
app.use(cors(options))

app.get('/', (req, res) => {
  res.send(`
    Routes:<br />
    /api/products<br />
  `)
})

router(app)

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  env == 'dev' && console.log(`Listening at http://localhost:${port}`)
})
