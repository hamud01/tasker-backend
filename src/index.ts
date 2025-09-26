import {createServer} from 'node:http'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'
import config from '@/config'
import v1 from '@/v1.router'
import { connect } from 'mongoose'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/error.middleware'

const app = express()

// Setup App Middlewares
app.use(express.json()),
app.use(express.urlencoded({extended:true}))
app.use(cookieParser(config.cookie.secret))
app.use(
  cors({
    origin: config.origin
  })
)
app.use(helmet({
  hidePoweredBy: true
}))
app.use(logger('dev'))

app.use('/api', v1)
app.use(errorHandler)

try {
  await connect(config.mongoUri)
  console.log('Connected to mongodb')
  const server = createServer(app)
  server.listen(config.port, () => {
    console.log(`Server running up in port ${config.port}`)
  })
} catch (error) {
  console.error(error)
}
