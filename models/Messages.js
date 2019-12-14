const connect = require('./con')

const Messages = connect.sequelize.define('message', {

	id: {
		type: connect.Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	author: {
		type: connect.Sequelize.STRING,
		allowNull: false  
	},
	content: {
		type: connect.Sequelize.STRING,
		allowNull: false
	}

})

module.exports = Messages;
Messages.sync({force:true})