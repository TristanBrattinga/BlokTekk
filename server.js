/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const compression = require('compression')
const passport = require('passport')

/**========================================================================
 *                       Requiring seperate routes
 *========================================================================**/

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

/**========================================================================
 *                      Requiring mongoose models
 *========================================================================**/

const User = require('./models/userModel')

/**========================================================================
 *                  Defining and connection to database
 *========================================================================**/

// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URI}`
//
// async function main () {
//   await mongoose.connect(uri, {
//     dbName: process.env.DB_NAME,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   console.log('Succesfully connected')
// }
// main().catch((err) => console.log(err))

/**========================================================================
 *                           Middleware
 *========================================================================**/

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(compression())

/**========================================================================
 *                           Templating
 *========================================================================**/

app.set('view engine', 'ejs')
app.set('views', 'views')
app.set('layout', 'layouts/main')

/**========================================================================
 *                           Sessions
 *========================================================================**/

// const sessionSecret = process.env.SESSION_SECRET
// const store = new MongoDBStore({
//   // uri,
//   collection: process.env.DB_COLLECTION_SESSIONS
// })
//
// app.use(session({
//   secret: sessionSecret,
//   resave: false,
//   saveUninitialized: true,
//   store
// }))

// app.use(passport.initialize())
// app.use(passport.session())

/**========================================================================
 *                           Routing
 *========================================================================**/

/**----------------------
 *    Home Page
 *------------------------**/
app.use('/', indexRouter)

/**----------------------
 *    Register Page
 *------------------------**/
app.use('/users', userRouter)

/**----------------------
 *    Location Page
 *------------------------**/

app.get('/location', (req, res) => {
    res.render('location', { cityData: null })
})

app.post('/location', async (req, res) => {
    const { latitude, longitude, jsEnabled } = req.body
    const url = `https://api.api-ninjas.com/v1/reversegeocoding?lat=${latitude}&lon=${longitude}`

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': process.env.NINJA_API_KEY,
            },
        })

        const cityData = await response.json()

        res.status(200).json({
            status: 'success',
            cityData
        })
        // res.render('location', {
        //     cityData: cityData[0]
        // })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve city data',
            error: error.message,
        })
    }
})

/**========================================================================
 *                           404 Error Handler
 *========================================================================**/

app.use((req, res) => {
    res.status(404).send('We`re sorry, we were not able to find the page you were looking for')
})
/**========================================================================
 *                           Start Webserver
 *========================================================================**/

app.listen(port, () => {
    console.log(`Server is listening to port: ${port}`)
})
