import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/foods.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    // const adminUser = createdUsers.find((user) => user.isAdmin)._id

    // const sampleProducts = products.map((product) => {
    //   return {
    //     ...product,
    //     user: adminUser,
    //   }
    // })

    // await Product.insertMany(sampleProducts)
    console.log('Data Imported')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
