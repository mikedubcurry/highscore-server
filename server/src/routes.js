module.exports = (app) => {
	app.get('/highscores/:game', (req, res) => {
		const { game } = req.params;
		if (!game) {
			return res.json({ error: 'must supply the game' });
		}
		req.highscores.findAll({ limit: 10, where: { game } }).then((scores) => {
			res.json({ scores });
		});
	});

	app.get('/highscores', (req, res) => {
		req.highscores.findAll().then((scores) => {
			res.json({ scores });
		});
	});

	app.post('/highscores/:game', (req, res) => {
		const Model = req.highscores;
		const { initials, score } = req.body;
		const { game } = req.params;

		if (!game) {
			return res.json({ error: 'must supply game' });
		}

		if (!score || isNaN(parseInt(score)) || parseInt(score) < 1) {
			return res.json({ error: 'must submit a valid score' });
		}

		const newScore = new Model({
			...(initials && { initials: initials.slice(0, 4) }),
			score: parseInt(score),
			game,
		});

		newScore
			.save()
			.then((val) => {
				res.json({ score: val });
			})
			.catch((err) => {
				res.json({ error: err });
			});
	});

	app.delete('/highscores/:id', (req, res) => {
		const Model = req.highscores;

		const { id } = req.params;

		if (!id) {
			return res.json({ error: 'must supply id to delete a score' });
		}

		Model.destroy({
			where: { id },
		})
			.then((score) => {
				res.json({ score, message: 'deleted' });
			})
			.catch((err) => {
				console.log(err);
				res.json({ error: err });
			});
	});
};
