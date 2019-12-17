const Sequelize = require('sequelize')
const sequelize = new Sequelize('PERGDB', 'root', 'root', {
	host: "localhost",
	dialect: 'mysql'
})

	module.exports = {
		Sequelize: Sequelize,
		sequelize: sequelize
	};

/*sequelize.authenticate().then(function(){
	console.log("conectado com sucesso!")
}).catch(function(erro){
	catchonsole.log("Falha ao se conectar! " + erro)
}) */
