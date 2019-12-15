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
<<<<<<< HEAD
//Users.sync({force:true})
=======
// Users.sync({force:true})
>>>>>>> 00b4beaefd7cd34667959275c2695fead459f3a7
