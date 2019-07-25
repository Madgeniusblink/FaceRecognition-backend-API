const Clarifai = require('clarifai')

// You must add your own api key here from clarifai
const app = new Clarifai.App({
    apiKey: 'daad0b50024e4482afa8c4e49a7acbfd'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then((data) => {
			res.json(data)
		}).catch((err) => res.status(400).send({err: 'unable to work with API'}))

}

const handleImage = (db) => (req, res) =>{
    const { id } = req.body
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then((entries) => {
			res.send(entries[0])
		}).catch((err) => {
			res.status(400).send({err: 'unable to return entries'})
		})
}


module.exports = {
	handleImage,
	handleApiCall
}