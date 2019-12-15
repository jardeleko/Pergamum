const connect = require('./con')

const Users = connect.sequelize.define('users', {
	id: {
		type: connect.Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	user: {
		type: connect.Sequelize.STRING,
		allowNull: false  
	},
	email: {
		type: connect.Sequelize.STRING,
		allowNull: false 
	},
	passw: {
		type: connect.Sequelize.STRING,
		allowNull: false
	},

	iServer: {
		type: connect.Sequelize.STRING
	}
})

module.exports = Users;

