const connect = require('./con')

const Messages = connect.sequelize.define('message', {

	author: {
		type: connect.Sequelize.STRING,
		allowNull: false  
	},

	content: {
		type: connect.Sequelize.STRING,
		allowNull: false
	},

	id: {
		type: connect.Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
})

module.exports = Messages;
//Messages.sync({force:true})