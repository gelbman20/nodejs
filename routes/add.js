const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Add new course',
    isAdd: true
  })
})

router.post('/', (req, res) => {
  const { title, price, image } = req.body
  const course = new Course(title, price, image)
  course.save().then(() => {})
  res.redirect('/courses')
})

module.exports = router