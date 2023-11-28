import Joi from 'joi'
import HttpError from 'http-errors'

const createOneUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    // yêu cầu mật khẩu là một chuỗi chỉ chứa các ký tự chữ cái (cả chữ hoa và chữ thường) và số, với độ dài từ 3 đến 30 ký tự
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password')
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    next()
  } catch (error) {
    next(HttpError.UnprocessableEntity(error.message))
  }
}

export const userValidation = {
  createOneUser
}
