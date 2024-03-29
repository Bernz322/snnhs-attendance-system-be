require('dotenv').config()
const express = require('express')
const db = require("./models");
const path = require('path')

const PORT = process.env.PORT || 8000

// Routes
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve all static files first
app.use(express.static(path.resolve('../client/build')))

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();

});

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/attendance', attendanceRoutes)

db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})