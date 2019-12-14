const connect = require('./con')

const Agendamentos = connect.sequelize.define('agendamentos', {
	user: {
		type: connect.Sequelize.STRING,
		allowNull: false  
	},
	email: {
		type: connect.Sequelize.STRING,
		allowNull: false 
	},
	assunto: {
		type: connect.Sequelize.STRING,
		allowNull: false
	},

	data: {
		type: connect.Sequelize.Date
	},

	iServer: {
		type: connect.Sequelize.STRING
	}
})

module.exports = Agendamentos;
Agendamentos.sync({force:true})