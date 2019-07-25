const handleSignin = (db, bcrypt) => (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res.status(400).send({Error: 'incorrect form submission'})
	}
    db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then((data) => {
			const isValid = bcrypt.compareSync(password, data[0].hash)
			if (isValid) {
				return db.select('*').from('users')
					.where('email', '=', email)
					.then((user) => {
						res.send(user[0])
					}).catch(err => res.status(400).send({err: 'unable to get user'}))
			} else {
				res.status(400).send({ error: 'wrong credentials'})
			}
		}).catch((err) => {
			res.status(400).send({err: 'wrong credentials'})
		})
}


module.exports = {
    handleSignin
}