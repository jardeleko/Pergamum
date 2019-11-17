const express = require('express')
const router = express.Router()
const methodOverride = require('method-override') // REST-API
const Users = require('../models/Users')
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser')
const session = require("express-session");
const flash = require("connect-flash");
const passport = require('passport');
require('../config/auth')(passport);
const {iServer} = require('./protected'); //middleware restrict page


router.use(methodOverride('_method'))
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.use(session ({
	secret:"sessionkey",
	resave: true, 
	saveUninitialized: true
}))

router.use(passport.initialize())
router.use(passport.session())
router.use(flash())


router.post('/', (req, res, next) => {
	passport.authenticate("local", {
		successRedirect: "/chat",
		failureRedirect: "/",
		failureFlash: true 
	})(req, res, next)
})

router.get('/logout', (req, res, next) => {
	req.logout();
	res.redirect('/');
	next()
})

router.get('/', (req, res) =>  {
	res.render('index')
  })
  
router.get('/chat', (req, res) => {
	if(req.isAuthenticated())
		var user_name = req.session.user
		console.log(user_name)
		console.log(req.$_session)
	res.render('html/home', {user_name: user_name})
})
  
router.get('/create', (req, res) => {
	res.render('html/cadaster')
})

router.post('/createAcc',(req, res) => { /* create User*/
	
	let erros = []


	if(!req.body.user_sign || typeof req.body.user_sign == undefined || req.body.user_sign == null){
		erros.push({message: "campo usuario esta vazio, crie um @username"})
	}

	if(!req.body.email_sign || typeof req.body.email_sign == undefined || req.body.email_sign == null){
		erros.push({message: "É necessario um email para o cadastro"})
	} 
	if(!req.body.pass_sign || typeof req.body.pass_sign == undefined || req.body.pass_sign == null){
		erros.push({message: "Campo de senha vazio"})
	}
	if(req.body.pass_sign != req.body.pass_sign2){
		erros.push({message: "Senhas não compatíveis"})
	}
	if(req.body.name_sign < 8){
		erros.push({message: "É necessário no mínimo 8 caracteres na senha"})
	}
	if(erros.length > 0){
		res.render('html/cadaster', {erros: erros})
	}
	
	else {	
		//hashing password
		let password = req.body.pass_sign;
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt); 
		password = hash;
		console.log(password)

			Users.create({
			user: req.body.user_sign,
			email: req.body.email_sign,
			passw: password,

		}).then(() => {
			req.flash("success_msg", "Usuario cadastrado");
			res.redirect('/');
		}).catch((err) => {
			console.log(err)
			req.flash("error_msg", "Erro ao salvar o usuario, tente novamente!");
			res.redirect('/create')
		})	
	}
})

module.exports = router;