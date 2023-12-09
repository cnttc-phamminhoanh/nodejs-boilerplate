import { WHITELIST_DOMAINS } from '~/utils/constants'
import { env } from './environment'
import HttpError from 'http-errors'

export const corsOptions = {
  origin: function (origin, callback) {
    // cho phép việc gọi API bằng postman trên môi trường dev
    // thông thường khi sử dụng thì origin trên postman sẽ có giá trị underfined
    if (!origin && env.BUILD_MODE === 'dev') {
      return callback(null, true)
    }

    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    return callback(HttpError.Forbidden(`${origin} not allowed by our CORS Policy.`))
  },
  // option này hỗ trợ cho các trình duyệt cũ
  optionsSuccessStatus: 200,
  // cho phép nhận cookie từ request, header sẽ được pass, nếu không có thì mặc định nó sẽ bỏ qua header
  credentials: true
}
