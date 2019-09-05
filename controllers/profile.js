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

const handleProfileUpdate = (db) => (req, res) => {
	const { id } = req.params;
	console.log('HERRRRRR!',req.body)
	console.log('HERRRRRR!',req.body.formInput)
	const { name, age, facebook } = req.body.formInput
	db('users')
		.where({ id })
		.update({ name })
		.then(resp => {
			if (resp) {
				res.json("success")
			} else {
				res.status(400).json('Not found')
			}
	})
	.catch(err => res.status(400).json('error updating user'))
  }
  
  module.exports = {
	handleProfileGet,
	handleProfileUpdate
  }