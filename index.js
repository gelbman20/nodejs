const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const homeRouter = require('./routes/home')
const addRouter = require('./routes/add')
const coursesRouter = require('./routes/courses')
const cardRouter = require('./routes/card')

const PORT = process.env.PORT || 8080
const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))

// Router
app.use(express.urlencoded({ extended: true }))
app.use('/', homeRouter)
app.use('/add', addRouter)
app.use('/courses', coursesRouter)
app.use('/card', cardRouter)

async function start () {
  try {
    const url = `mongodb+srv://gelbman20:GjRc5ZxLNoIECICA@cluster0.peicj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
  .then(() => {
    console.log('contected')
  })
  .catch()
