const connect = require('./con')

const Calender = connect.sequelize.define('calender', {
	user: {
		type: connect.Sequelize.STRING,
		allowNull: false  
	},
	email: {
		type: connect.Sequelize.STRING,
		allowNull: false 
	},
	content: {
		type: connect.Sequelize.STRING,
		allowNull: false
	},
	createdAt: {
		type: connect.Sequelize.DATE,
		allowNull: false
	},
	updatedAt: {
		type: connect.Sequelize.DATE,
		allowNull: false
	}
})

module.exports = Calender;
Calender.sync({force:true})