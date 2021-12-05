const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Highscore = sequelize.define(
		'highscore',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			initials: {
				type: DataTypes.STRING(4),
				defaultValue: 'Anon',
			},
			score: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			date: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			timestamps: false,
		}
	);

	return Highscore;
};
