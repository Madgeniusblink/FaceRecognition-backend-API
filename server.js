const express = require('express')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const cors = require('cors')

// LocalImports
const database = require('./database')

// SERVER APP
const app = express()
const port = 8080

// BCRYPT SETTINGS
const saltRounds = 10;

//MIDDLEWARE SETTINGS
app.use(bodyParser.json())
app.use(cors())

// ROUTES
app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password) {
		res.json(database.users[0])
	} else {
		res.status(400).send({error: 'Error logging in'})
	}
})

app.post('/register', (req, res) => {
	try {
		const { email, name, password } = req.body
		// const hash = bcrypt.hashSync(password, saltRounds)
		database.users.push({
			id: '125',
			name,
			email,
			entries: 0,
			joined: new Date()
		})
		res.send(database.users[database.users.length-1])
	} catch (error) {
		res.status(400).send({error: 'ERROR Registering'})
	}
})



app.get('/', (req, res) => {
	try {
		res.send(database)
	} catch (error) {
		res.status(400).send(error)
	}
})



app.get('/profile/:id', (req, res) => {
	const { id } = req.params
	let found = false
	database.users.forEach((user) => {
		if (user.id === id ) {
			found = true
			return res.send(user)
		}
	})
	if (!found) {
		res.status(400).send({erroor: 'NO User Found'})
	}

})

app.put('/image', (req, res) => {
	const { id } = req.body
	let found = false
	database.users.forEach((user) => {
		if (user.id === id ) {
			found = true
			user.entries++
			return res.send(`${user.entries}`)
		}
	})
	if (!found) {
		res.status(400).send({error: 'Not Found'})
	}
})




app.listen(port, () => console.log(`>FaceRecognition API APP listening on port ${port}`))
