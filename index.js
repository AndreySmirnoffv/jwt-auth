require('dotenv').config({path: "./assets/modules/.env"})
const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./assets/routes/auth')
const secureRoutes = require('./assets/routes/secure')

const app = express()

app.use(bodyParser.json())

app.use("/auth", authRoutes)
app.use("/api", secureRoutes)

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
