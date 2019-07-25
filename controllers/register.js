const handleRegister = (db, bcrypt, saltRounds) => (req, res) => {
	const { email, name, password } = req.body
	if (!email || !name || !password) {
		return res.status(400).send({Error: 'incorrect form submission'})
	}
	const hash = bcrypt.hashSync(password, saltRounds)
	db.transaction((trx) => {
		trx.insert({
			hash: hash,
			email: email
		}).into('login').returning('email').then((loginEmail) => {
			return trx('users').returning('*').insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			}).then((user) => {
				res.send(user[0])
			})
		}).then(trx.commit).catch(trx.rollback)
	}).catch((err) => {
		res.status(400).send({err: 'unable to register'})
	})
}




module.exports = {
    handleRegister
}