const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const homeRouter = require('./routes/home')
const addRouter = require('./routes/add')
const coursesRouter = require('./routes/courses')
const cardRouter = require('./routes/card')
const ordersRouter = require('./routes/orders')
const User = require('./models/user')

const PORT = process.env.PORT || 8080
const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
  try {
    req.user = await User.findById('60a8f09dbca8cf376ccdae3a')
    next()
  } catch (e) {
    console.log(e)
  }
})

app.use(express.static('public'))

// Router
app.use(express.urlencoded({ extended: true }))
app.use('/', homeRouter)
app.use('/add', addRouter)
app.use('/courses', coursesRouter)
app.use('/card', cardRouter)
app.use('/orders', ordersRouter)

async function start () {
  try {
    const url = `mongodb+srv://gelbman20:GjRc5ZxLNoIECICA@cluster0.peicj.mongodb.net/shop`
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    const candidate = await User.findOne()
    if (!candidate) {
      const user = new User({
        email: 'gelbman20@gmail.com',
        name: 'Andrii',
        cart: { items: [] }
      })
      await user.save()
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
  .then()
  .catch()
