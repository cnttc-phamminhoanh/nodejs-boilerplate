import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

// Khởi tạo đối tượng database instance ban đầu là null (vì ta chưa connect)
let trelloDatabaseInstall = null

// khởi tạo đối tượng mongoClientInstance để connect đến mongodb
const mongoClientInstance = new MongoClient(env.MONGO_DB_URI, {
  /*
    option serverApi có từ phiên bản 5.0.0 trở lên, có thể không cần dùng vẫn connect được,
    nếu dùng thì ta phải chỉ định một Stable ServerApiVersion của MongoDB
  */
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true, // gọi một lệnh hay function không phù hợp với phiên bản sẽ báo lỗi
    deprecationErrors: true // gọi một method bị bỏ không còn được dùng sẽ báo lỗi
  },
  auth: {
    username: env.MONGO_DB_USERNAME,
    password: env.MONGO_DB_PASSWORD
  },
  authSource: 'admin'
})

// Kết nối tới Database
export const CONNECT_DB = async () => {
  // gọi kết nối tới mongoDb với URI đã khai báo trong mongoClientInstance
  await mongoClientInstance.connect()

  // nếu connect thành công thì lấy database theo tên rồi gán vào biến global trelloDatabaseInstall
  trelloDatabaseInstall = mongoClientInstance.db(env.MONGO_DB_DATABASE_NAME)
}

// đảm bảo gọi hàm này sau khi connect thành công đến mongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstall) throw new Error('Must connect to Database first!')

  return trelloDatabaseInstall
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}
