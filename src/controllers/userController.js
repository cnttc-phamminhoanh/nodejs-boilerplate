import HttpError from 'http-errors'

const createOneUser = async (req, res, next) => {
  try {
    res.status(201).json({
      statusCode: 201,
      message: 'Create User'
    })
  } catch (error) { next(error) }
}

const getAllUser = async (req, res, next) => {
  try {
    const users = null

    if (!users) {
      throw HttpError.NotFound('User Not Found')
    }

    res.status(200).json({
      total: 0,
      data: users
    })
  } catch (error) { next(error) }
}

export const userController = {
  createOneUser,
  getAllUser
}
