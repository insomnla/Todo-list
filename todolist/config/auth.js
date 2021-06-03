module.exports = {
    ensureAuthenticated : function(req,res,next) {
        if(req.session.loggedin) {
            return next();
        }
        req.flash('error_msg' , 'Пожалуйста зайдите чтобы просматривать ресурс');
        res.redirect('/login');
    },
    ensureDirector : function(req,res,next) {
        if(req.session.role == 3) {
            return next();
        }
        res.redirect('/board');
    },
    ensureDepDirector : function(req,res,next) {
        if(req.session.role >= 2 && req.session.role <= 3 ) {
            return next();
        }
        res.redirect('/board');
    }
}