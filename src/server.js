/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import HttpError from 'http-errors'
import cors from 'cors'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { env } from './config/environment'
import { corsOptions } from './config/cors'

const START_SERVER = () => {
  const app = express()

  const hostname = env.APP_HOST
  const port = env.APP_PORT

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/v1', APIs_V1)

  app.use(() => {
    throw HttpError.NotFound('Route Not Found')
  })

  app.use(errorHandlingMiddleware)

  app.listen(port, hostname, () => {
    console.log(`Hello Minh Oanh, I am running at http://${hostname}:${port}/`)
  })

  // bắt các tín hiệu thoát hoặc tắt server để đóng kết nối đến mongodb
  exitHook(() => {
    CLOSE_DB()
  })
}

/*
  cách viết IIFE - Immediately Invoked Function Expression
  thực thi ngay lập tức một hàm async
  để sử dụng với await hoặc
  dùng cách viết then catch bên dưới
*/
(async () => {
  try {
    await CONNECT_DB()

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Connected to Mongo Database'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error)
//     process.exit(0)
//   })
