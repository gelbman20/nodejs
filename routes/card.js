const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

function mapCartItems (cart) {
  return cart.items.map(c => ({
    ...c.courseId._doc, count: c.count
  }))
}

function computePrice (courses) {
  return courses.reduce((total, course) => {
    return total + course.price * course.count
  }, 0)
}

router.post('/add', async (req, res) => {
  try {
    const course =  await Course.findById(req.body.id)
    await req.user.addToCart(course)
    res.redirect('/card')
  } catch (e) {
    console.log(e)
  }
})

router.get('/', async (req, res) => {
  const user = await req.user
    .populate('cart.items.courseId')
    .execPopulate()

  const courses = mapCartItems(user.cart)

  res.render('card', {
    title: 'Card',
    isCard: true,
    courses : courses,
    price: computePrice(courses)
  })
})

router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  const card = await Card.delete(id)
  res.status(200).json(card)
})

module.exports = router
