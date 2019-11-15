const connect = require('con')

const Users = connect.sequelize.define('users', \{
	id: {
		type: connect.sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	iduffs: {
		type: connect.sequelize.STRING,
		allowNull: false  
	},
	email: {
		type: connect.sequelize.STRING,
		allowNull: false 
	},
	passw: {
		type: connect.sequelize.STRING,
		allowNull: false
	},
	confirm: {
		type: connect.sequelize.STRING,
		allowNull: false	
	},

	iServer: {
		type: connect.sequelize.STRING
	}
})

module.exports = Users;
//Users.sync({force:true})