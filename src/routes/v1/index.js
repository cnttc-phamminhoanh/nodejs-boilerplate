import express from 'express'
import { userRoutes } from './userRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(200).json({
    message: 'APIs V1 are ready to use'
  })
})

Router.use('/users', userRoutes)

export const APIs_V1 = Router
