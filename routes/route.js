const express = require('express')
const router = express.Router()
const methodOverride = require('method-override') // REST-API
const Users = require('../models/Users')
const Calender = require('../models/Calender')
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
		successRedirect: "/menu",
		failureRedirect: "/",
		failureFlash: true 
	})(req, res, next)
})

router.use((req, res, next) => { //var globals
	res.locals.success_msg = req.flash("success_msg")
	res.locals.error_msg = req.flash("error_msg")
	res.locals.user = req.user || null;
	res.locals.error = req.flash("error")
	next()
})

router.get('/logout', (req, res, next) => {
	req.logout();
	res.redirect('/');
	next()
})

router.get('/', (req, res) =>  {
	res.render('index')
  })
  
router.get('/menu', (req, res) => {
	if(req.isAuthenticated())
		res.render('html/opcoes', {username : res.locals.user.user})
})
  
router.get('/create', (req, res) => {
	res.render('html/cadaster')
})

router.get('/chat', (req, res) => {
	if(req.isAuthenticated()){
	  res.render('html/chat')
	}else{
		res.render('index')
	}
})

router.get('/agendamentos', (req, res) => {
	if(req.isAuthenticated() && req.user.iServer == 1){
		res.render('html/agendamentos')
	
		let errors = []
		let calender = req.body
		var data_atual = new Date().toDateString()
		var data = req.body.data
		if (!req.body.username || typeof req.body.username == undefined || req.body.username == null ) {
			errors.push({message:'Preencha o nome do usuário'}) 
		}

		if (!req.body.assunto || typeof req.body.assunto == undefined || req.body.assunto == null ) {
			errors.push({message:'Preencha o campo assunto'}) 
		}

		if (!req.body.data || typeof req.body.data == undefined || req.body.data == null ) {
			errors.push({message:'Preencha o campo data'}) 
		}

		if (data.toDateString() <= data_atual) {
			errors.push({message:'Escolher uma data posterior!'}) 
		}

		if(errors.length > 0){
			res.render('html/agendamentos', {errors: errors, calender: calender})
		}else{
			Calenders.create({
				user: req.body.username,
				email: req.body.email,
				content: req.body.assunto,
				createdAt: data,
				updateAt: data_atual,

			}).then(() => {
				req.flash("success_msg", "Agendamento realizado com sucesso");
				res.redirect('/opcoes');
			}).catch((err) => {
				req.flash("error_msg", "Erro ao realizar o agendamento, tente novamente!");
				res.redirect('/agendamentos')
			})	
		}
	}
	else if(req.isAuthenticated()){
		res.render('html/listDate')
	}
})

router.post('/createAcc',(req, res) => { 
	
	let erros = []
	let cliente = req.body


	if(!req.body.username || typeof req.body.username == undefined || req.body.username == null){
		erros.push({message: "O campo usuário não pode estar vazío!"})
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
	if(req.body.pass_sign < 8){
		erros.push({message: "É necessário no mínimo 8 caracteres na senha"})
	}
	if(erros.length > 0){
		res.render('html/cadaster', {erros: erros, cliente: cliente})
	}else {	
		let password = req.body.pass_sign;
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt); 
		password = hash;

		Users.create({
			user: req.body.username,
			email: req.body.email_sign,
			passw: password,

		}).then(() => {
			req.flash("success_msg", "Usuario cadastrado");
			res.redirect('/');
		}).catch((err) => {
			req.flash("error_msg", "Erro ao salvar o usuario, tente novamente!");
			res.redirect('/create')
		})	
	}
})

router.post('/calender', (req, res) => {
	let erros = [];
	if(!req.body.username || typeof req.body.username == undefined || req.body.username == null){
		erros.push({message: "campo usuario esta vazio, crie um @username"})
	}
	if(!req.body.email_sign || typeof req.body.email_sign == undefined || req.body.email_sign == null){
		erros.push({message: "É necessario um email para o cadastro"})
	} 
	if(!req.body.assunto || typeof req.body.assunto == undefined || req.body.assunto == null){
		erros.push({message: "Necessario incluir um assunto"})
	}
	if(!req.body.data || typeof req.body.data == undefined || req.body.data == null){
		erros.push({message: "Escolha uma data disponível"})
	}
	if(erros.length > 0){
		res.render('html/agendamentos', {erros: erros})
	}
	else {	
		console.log(req.body.username)
		console.log(req.body.email_sign)
		console.log(req.body.assunto)
		console.log(req.body.data)

			Calender.create({
			user: req.body.username,
			email: req.body.email_sign,
			content: req.body.assunto,
			createdAt: req.body.data

		}).then(() => {
			req.flash("success_msg", "Horario incluído");
			res.redirect('/agendamentos');
		}).catch((err) => {
			console.log(err)
			req.flash("error_msg", "Algum erro inesperado, tente alterar a data!");
			res.redirect('/create')
		})	
	}
})

module.exports = router;