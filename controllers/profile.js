const handleProfileGet = (db) => (req, res) => {
    const { id } = req.params
	db.select('*').from('users').where({id}).then((user) => {
		if (user.length) {
			res.send(user[0])
		} else {
			res.status(400).send({err: 'not found'})
		}
	}).catch((err) => {
		res.status(400).send({err: 'error getting user'})
	})
}


module.exports = {
    handleProfileGet
}