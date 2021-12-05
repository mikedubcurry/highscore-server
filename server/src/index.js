const { config } = require('dotenv');
const express = require('express');
const cors = require('cors');

const sqlConnection = require('./db');
const model = require('./models/highscores');
const routes = require('./routes');

config();

const app = express();

const port = process.env.PORT || 3000;

sqlConnection
	.authenticate()
	.then(() => {
		const highscores = model(sqlConnection);
		sqlConnection.sync();

		// register middlewards
		app.use(express.json());
		app.use(cors());
		// place model in request obj
		app.use((req, res, next) => {
			req.highscores = highscores;
			next();
		});
		// register routes
		routes(app);

		app.listen(port, () => {
			console.log(`listening on port ${port}`);
		});
	})
	.catch((err) => {
		console.log('something went wrong with the db connection');
		console.error(err);
	});
