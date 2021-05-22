const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

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
  const card = await Card.fetch()
  res.render('card', {
    title: 'Card',
    isCard: true,
    courses : card.courses,
    price: card.price
  })
})

router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  const card = await Card.delete(id)
  res.status(200).json(card)
})

module.exports = router
