module.exports = {
    iServer: ((req, res, next) => {
        if(req.isAuthenticated() && req.user.iServer == 1)  return next();
        res.redirect('/')
    }
)}


