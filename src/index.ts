import {createServer} from 'node:http'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'
import config from '@/config'
import v1 from './router'
import { connect } from 'mongoose'

const app = express()

// Setup App Middlewares
app.use(express.json()),
app.use(express.urlencoded({extended:true}))
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
