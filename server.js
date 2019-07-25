const express = require('express')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')

// Controllers
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

// DATABASE POSTGRESQL
const db = knex({
	client: 'pg',
	connection: {
	  host : 'postgresql-elliptical-13500',
	  user : 'daahmpojioijku',
	  password : '',
	  database : 'face-recognition'
	}
});

// SERVER APP
const app = express()
const port = process.env.PORT || 8080

// BCRYPT SETTINGS
const saltRounds = 10;

//MIDDLEWARE SETTINGS
app.use(bodyParser.json())
app.use(cors())

// ROUTES
app.get('/', (req, res) => {
	try {
		res.send('It is working!!')
	} catch (error) {
		res.status(400).send(error)
	}
})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt, saltRounds))

app.get('/profile/:id', profile.handleProfileGet(db))

app.put('/image', image.handleImage(db))

app.post('/imageurl', (req, res) => { image.handleApiCall(req,res) })





app.listen(port, () => console.log(`>FaceRecognition API APP listening on port ${port}`))
