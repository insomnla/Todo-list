module.exports = {
    ensureAuthenticated : function(req,res,next) {
        if(req.session.loggedin) {
            return next();
        }
        req.flash('error_msg' , 'Пожалуйста зайдите чтобы просматривать ресурс');
        res.redirect('/login');
    }
}