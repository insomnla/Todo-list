const mysql = require("mysql");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const express = require('express')
const app = express()
const port = 3000
const path = require('path'); 
const flash = require('connect-flash');
const session = require('express-session');
const { SSL_OP_NO_QUERY_MTU } = require("constants");
const passport = require("passport");
var MySQLStore = require('express-mysql-session')(session);
const {ensureAuthenticated} = require('./config/auth'); 
const { connect } = require("http2");
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
require('./config/passport')(passport)
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));

app.use(passport.initialize())
app.use(passport.session())

const connection = mysql.createConnection({
    connectionLimit: 5,
    password: 'password',
    host: "localhost",
    user: "root",
    database: "test"
});

var sessionStore = new MySQLStore({
    checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
    expiration: 86400000,// The maximum age of a valid session; milliseconds.
    createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist.
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, connection);


connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
});


app.use(express.static(__dirname + '/views'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })
    

app.get('/', (req, res) => {
    res.render('welcome')
})

app.get('/login', (req, res) => {
    res.render('welcome')
})

app.get('/vacation',  ensureAuthenticated, (req, res) => {
    res.render('vacation', {
        info: req.session.username
    })
})

app.post('/register', (req, res) => {
    const info = req.body;
    let errors = [];
    console.log(" pass = " + info.pass + " mail = " + info.mail);
    if (!info.pass || !info.mail){
        errors.push({msg : "Пожалуйста заполните все поля"})
    }
    if (!(info.pass == info.validPass)){
        errors.push({msg : "Пароли должны совпадать"})
    }
    connection.query("SELECT * from worker where mail = (?)", [info.mail],  function (err, result, fields){
        if (result.length > 0){
            errors.push({msg: "Почта уже зарегистрирована"})
            console.log("ПРОВЕРКА ПОЧТЫ " + errors.length)
        }
    })
    setTimeout( function(){
    if (errors.length > 0){
        res.render('register', {
            errors : errors
        })
    }
    else {
        req.flash('success_msg','You have now registered!');
        res.render('welcome')
    }
    }, 100)
    connection.query("INSERT INTO worker (lname, fname, mname, pass, mail) VALUES(?,?,?,?,?)", [req.body.lname, req.body.fname, req.body.mname, req.body.pass, req.body.mail]);
})

app.get('/board', ensureAuthenticated , (req, res) => {
    connection.query("select categories.categories, count(*) as count from task inner join categories on task.fk_id_categories = categories.id_categories inner join worker on worker.id_worker = task.fk_id_worker where id_worker = ? group by fk_id_categories", [req.session.userid] , function(error, results, fields){
        categories = results;
    })
    connection.query("select * , CAST(deadline AS CHAR) as dline from task where fk_id_categories = 3 and fk_id_worker is null", function(error, results, fields){
        gov_tasks = results;
    })
    connection.query("select task.name, task.desc, categories.categories, CAST(deadline AS CHAR) as dline from task inner join worker on task.fk_id_worker = worker.id_worker inner join categories on fk_id_categories = categories.id_categories where worker.id_worker = ?", [req.session.userid], function(error, results, fields) {
        res.render('board', {
            categories : categories,
            gov_tasks : gov_tasks,
            tasks : results,
            info : req.session.username,
            id: req.session.userid
           })
    })
})

app.post('/board', ensureAuthenticated , (req, res) => {
    if (typeof req.body.task == "string"){
        connection.query("update task set fk_id_worker = ? where id_task = ?", [req.session.userid, req.body.task]);
    }
    if (typeof req.body.task == "object"){
        console.log("object pars")
        for (var key in req.body.task){
            connection.query("update task set fk_id_worker = ? where id_task = ?", [req.session.userid, req.body.task[key]]);
        }
    }
    connection.query("select categories.categories, count(*) as count from task inner join categories on task.fk_id_categories = categories.id_categories inner join worker on worker.id_worker = task.fk_id_worker where id_worker = ? group by fk_id_categories", [req.session.userid] , function(error, results, fields){
        categories = results;
    })
    connection.query("select * , CAST(deadline AS CHAR) as dline from task where fk_id_categories = 3 and fk_id_worker is null", function(error, results, fields){
        gov_tasks = results;
    })
    connection.query("select task.name, task.desc, categories.categories, CAST(deadline AS CHAR) as dline from task inner join worker on task.fk_id_worker = worker.id_worker inner join categories on fk_id_categories = categories.id_categories where worker.id_worker = ?", [req.session.userid], function(error, results, fields) {
        res.render('board', {
            categories : categories,
            gov_tasks : gov_tasks,
            tasks : results,
            info : req.session.username,
            id: req.session.userid
           })
    })
})

app.get('/register', (req, res) => {
    res.render('register')
})


app.post('/login', (req, res) => {
    var login = req.body.login;
    var password = req.body.password;
    console.log(login, password)
    if (login && password) {
		connection.query("SELECT * FROM worker WHERE mail = ? AND pass = ? ", [login, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
                req.session.username = results[0].fname + " " +results[0].mname ;
                req.session.userid = results[0].id_worker;
				res.redirect('/board');
			} else {
                req.flash('error_msg' , 'Введите правильную почту и пароль');
                res.redirect('/login');
			}			
		});
	} else {
        req.flash('error_msg' , 'Введите почту и пароль');
        res.redirect('/login');
	}
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

