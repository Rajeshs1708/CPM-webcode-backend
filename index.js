require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { db } = require('./DB/connection')

//Middleware
const app = express()
db()
app.use(cors())
app.use(express.json())

//Importing the Routes
const generalRoutes = require('./Routes/employee.route')
const authRoutes = require('./Routes/auth.route')
const leadsRoutes = require('./Routes/leads.router')
const paymentRoutes = require('./Routes/paymentRoute')

app.get('/', (req, res) => {
  res.status(200).send('Hello World')
})

//Adding custom middleware
app.use('/api', authRoutes)
app.use('/api', generalRoutes)
app.use('/api', paymentRoutes)
app.use('/api', leadsRoutes)

//PORT
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`App is listening in  port ${PORT}`)
})
