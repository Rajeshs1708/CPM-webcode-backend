const express = require('express')

const app = express()
const router = express.Router()
const bodyparser = require('body-parser')
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)
const { v4: uuidv4 } = require('uuid').v4

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
//Payment
router.post('/checkout', async (req, res) => {
  try {
    const { token, product } = req.body
    const transactionKey = uuidv4()
    return stripe.customers
      .create({
        email: token.email,
        source: token.id
      })
      .then(customer => {
        stripe.charges
          .create({
            currency: 'INR',
            customer: customer.id,
            receipt_email: token.email,
            description: product.description
          })
          .then(result => {
            res.json(result)
          })
          .catch(err => {
            console.log(err)
          })
      })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
