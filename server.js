const express = require('express')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')
const morgan = require('morgan')
// const compression = require('compression')
const helmet = require('helmet')

// Controllers
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const auth = require('./controllers/authorization')

// DATABASE POSTGRESQL
const db = knex({
	client: 'pg',
	connection: process.env.POSTGRES_URI
});

// SERVER APP
const app = express()
const port = process.env.PORT || 8080

// BCRYPT SETTINGS
const saltRounds = 10;

//MIDDLEWARE SETTINGS
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))
// app.use(compression())
app.use(helmet())

// ROUTES
app.get('/', (req, res) => {
	try {
		res.send('It is working!!')
	} catch (error) {
		res.status(400).send(error)
	}
})

app.post('/signin', signin.signinAuthentication(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt, saltRounds))

// Profile
app.get('/profile/:id', auth.requireAuth, profile.handleProfileGet(db))
app.post('/profile/:id', auth.requireAuth, profile.handleProfileUpdate(db))

// API
app.put('/image', auth.requireAuth, image.handleImage(db))
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req,res) })


app.listen(port, () => console.log(`>FaceRecognition API APP listening on port ${port}`))

