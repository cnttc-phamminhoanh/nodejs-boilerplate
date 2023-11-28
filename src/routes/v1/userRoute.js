import express from 'express'
import { userController } from '~/controllers/userController'
import { userValidation } from '~/validations/userValidation'

const Router = express.Router()

Router.route('/')
  .get(userController.getAllUser)
  .post(userValidation.createOneUser, userController.createOneUser)

export const userRoutes = Router
