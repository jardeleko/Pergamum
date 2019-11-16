const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")
//include users
const Users = require("../models/Users")

module.exports = function(passport){

    passport.use(new localStrategy({usernameField: 'idUFFS', passwordField: 'senha'}, (idUFFS, senha, done) => {
       
        Users.findOne({
           where:{
                user: [idUFFS]
            }}).then((users) => {

                if(!users) {
                    return done(null, false, {message: "Usuario não encontrado"})
                }
        
                bcrypt.compare(senha, users.passw, (err, login) => {
                    if(login){
                        return done(null, users)
                    }
                    else{
                        return done(null, false, {message: "senha errada"})
                    }
                })
                
            })
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
     
    });
    // deserialize user 
    passport.deserializeUser(function(id, done) {
    Users.findByPk(id).then(function(user) {
 
        if (user) {
            done(null, user.get());
 
        } else {
            done(user.errors, null);
 
        }
 
      });
 
    });

}