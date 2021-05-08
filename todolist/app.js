const url = require('url');
const fs = require("file-saver");
const docx = require("docx");
const { Document, Packer, Paragraph, Table, TableRow, TextRun, TableCell, WidthType } = docx;
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
const { worker } = require("cluster");
const { query } = require("express");
let worker_single = 0,
    worker_id = [0],
    socket_id = [0],
    dep_workers = 0;
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
require('./config/passport')(passport)
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
const server = app.listen(port, () => {
    console.log("Listening on port: " + port);
});
const io = require('socket.io')(server);
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

io.on("connection", (socket) => {
    console.log("USER CONNECTED");
    socket.on('message', (socketid,id) =>{
        socket_id[worker_id.indexOf(id)] = socketid;
    })
    socket.on("notification", (data)=>{
        console.log(data + " " + socket_id[worker_id.indexOf(data)]);
        console.log(worker_id.indexOf(data) + " " + worker_id.indexOf(1))
        socket.to(socket_id[worker_id.indexOf(data)]).emit('notification2', 'howdy'); 
    })
    console.log(socket_id);
    console.log(worker_id);
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
    if (req.session.loggedin){
        getBoard(req, res)
    } else res.render('welcome')
})

app.get('/login', (req, res) => {
    if (req.session.loggedin){
        getBoard(req, res)
    } else res.render('welcome')
})
app.get('/socket_test', (req, res) => {
    res.render('socket_test')
})


app.get('/vacation',  ensureAuthenticated, (req, res) => {
    res.render('vacation', {
        info: req.session.username
    })
})

app.get("/exit", (req, res) =>{
    req.session.loggedin = false;
    let index = worker_id.indexOf(worker_single);
    worker_id.splice(index, 1);
    socket_id.splice(index, 1);
    res.render('welcome')
})

app.get('/register', (req, res)=>{
    connection.query("select * from department", function(error, results, field){
        departments = results;
    });
    connection.query("select * from role", function(error, results, field){
        res.render('register',{
            roles : results,
            departments : departments
        })
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
    connection.query("INSERT INTO worker (lname, fname, mname, pass, mail, fk_id_role, fk_id_department, login) VALUES(?,?,?,?,?,0,0,?)", [req.body.lname, req.body.fname, req.body.mname, req.body.pass, req.body.mail, req.body.login]);
})

app.get('/board', ensureAuthenticated , (req, res) => {
    getBoard(req,res);
})

app.get("/admin", ensureAuthenticated, (req, res) => {
    if (req.session.userid == 0){
        res.render('admin')
    }
    else {
        getBoard(req,res);
    }
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
    getBoard(req,res);
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
                worker_single = req.session.userid = results[0].id_worker;
                req.session.department = results[0].fk_id_department;
                req.session.role = results[0].fk_id_role;
                worker_id.push(req.session.userid);
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

app.get("/profile", ensureAuthenticated, (req, res)=>{
    connection.query("select lname, fname, mname, mail, role, department_name from worker inner join role on id_role = fk_id_role inner join department on id_department = fk_id_department where id_worker = ? ", [req.session.userid], function(error,results,fields){
        profile = results;
    })
    connection.query("select id_task, categories.categories, task.desc, CAST(deadline AS CHAR) as dline, status.status from task inner join status on fk_id_status = id_status inner join categories on fk_id_categories = id_categories where fk_id_worker = ? and status = 'Активен'", [req.session.userid], function(error, results, fields) {
        res.render('profile', {
            profile : profile,
            id : req.session.userid,
            tasks : results
        })
    })
})

app.post("/profile", ensureAuthenticated,(req, res)=>{
    console.log(req.body);
    connection.query("select lname, fname, mname, mail, role, department_name from worker inner join role on id_role = fk_id_role inner join department on id_department = fk_id_department where id_worker = ? ", [req.body.pID], function(error,results,fields){
        profile = results;
    })
    connection.query("select  id_task, categories.categories, task.desc, CAST(deadline AS CHAR) as dline, status.status from task inner join status on fk_id_status = id_status inner join categories on fk_id_categories = id_categories where fk_id_worker = ? and status = 'Активен'", [req.body.pID], function(error, results, fields) {
        res.render('profile', {
            profile : profile,
            id : req.session.userid,
            tasks : results
        })
    })
})

app.post("/new_task", ensureAuthenticated, (req, res)=>{
    newTask(req);
    getBoard(req,res);
})

app.post("/add_task", ensureAuthenticated, (req, res)=>{
    addTask(req.body.taskToADD, req.session.userid);
    getDeparment(req, res);
})

app.post("/delete", ensureAuthenticated, (req, res)=>{
    deleteTask(req.body.taskToDelete);
    getBoard(req, res);
})

app.post("/update", ensureAuthenticated, (req, res)=>{
    changeTask(req.body);
    getBoard(req, res);
})

app.get("/department", ensureAuthenticated, (req,res)=>{
    getDeparment(req, res);
})

app.get("/direct_depart", ensureAuthenticated, (req,res)=>{
    getDirectDepart(req, res);
})

function getDirectDepart(req, res){
    connection.query("select * from categories", function(eror, results, fields){
        categ_name = results;
    })
    connection.query("select * from status", function(error, results, field){
        statuses = results;
    })
    console.log(req.body.taskName);
    if (!(req.body.taskName == undefined)){
        console.log("TRUE")
        connection.query("INSERT INTO task (task.name, task.desc, deadline, fk_id_worker, fk_id_categories) VALUES(?,?,?,?,?)", [req.body.taskName, req.body.taskDesc, req.body.taskDeadline, req.session.userid, req.body.categories]);
    }
/*    connection.query("select categories.categories, count(*) as count from task inner join categories on task.fk_id_categories = categories.id_categories inner join worker on worker.id_worker = task.fk_id_worker where id_worker = ? group by fk_id_categories", [req.session.userid] , function(error, results, fields){
        categories = results;
    }) */ 
    if (req.session.role == 2){
        connection.query("select id_task, task.name, task.desc, deadline, lname, LEFT(fname, 1) as fname, LEFT(mname, 1) as mname, fk_id_worker as worker from task inner join worker on task.fk_id_worker = worker.id_worker inner join department on worker.fk_id_department = department.id_department where id_department = ? order by worker", [req.session.department], function(error, results, fields) {
            dep_workers = results;
        })}
    connection.query("select id_worker, id_task, concat(lname,' ' ,fname,' ', mname) as fio, categories.categories, task.name, task.desc, CAST(deadline AS CHAR) as dline , status from task inner join worker on fk_id_worker = id_worker inner join categories on fk_id_categories = id_categories inner join status on fk_id_status = id_status inner join department on fk_id_department = id_department where fk_id_department = ?", [req.session.department], function(error, results, fields) {
        res.render('direct_depart', {
            categ_name : categ_name,
            tasks : results,
            info : req.session.username,
            id: req.session.userid,
            department: req.session.department,
            role: req.session.role,
            dep_workers: dep_workers,
            first: 0,
            statuses : statuses
           })
    })
}

function getDeparment(req, res){
    connection.query("select * from categories", function(eror, results, fields){
        categ_name = results;
    })
    connection.query("select * from status", function(error, results, field){
        statuses = results;
    })
    connection.query("select task.id_task, task.name, task.desc, categories.categories, CAST(deadline AS CHAR) as dline, status.status , status.status_color as color from task inner join categories on fk_id_categories = categories.id_categories inner join status on fk_id_status = status.id_status where fk_id_categories = 3 and fk_id_worker is null",  function(error, results, fields) {
     res.render("department",{
         categ_name : categ_name,
         tasks : results,
         info : req.session.username,
         id: req.session.userid,
         department: req.session.department,
         role: req.session.role,
         first: 0,
         statuses : statuses
    })
})
}

function getBoard(req, res){
    connection.query("select * from categories", function(eror, results, fields){
        categ_name = results;
    })
    connection.query("select * from status", function(error, results, field){
        statuses = results;
    })
    console.log(req.body.taskName);
    if (!(req.body.taskName == undefined)){
        console.log("TRUE")
        connection.query("INSERT INTO task (task.name, task.desc, deadline, fk_id_worker, fk_id_categories) VALUES(?,?,?,?,?)", [req.body.taskName, req.body.taskDesc, req.body.taskDeadline, req.session.userid, req.body.categories]);
    }
/*    connection.query("select categories.categories, count(*) as count from task inner join categories on task.fk_id_categories = categories.id_categories inner join worker on worker.id_worker = task.fk_id_worker where id_worker = ? group by fk_id_categories", [req.session.userid] , function(error, results, fields){
        categories = results;
    }) */ 
    if (req.session.role == 2){
        connection.query("select id_task, task.name, task.desc, deadline, lname, LEFT(fname, 1) as fname, LEFT(mname, 1) as mname, fk_id_worker as worker from task inner join worker on task.fk_id_worker = worker.id_worker inner join department on worker.fk_id_department = department.id_department where id_department = ? order by worker", [req.session.department], function(error, results, fields) {
            dep_workers = results;
        })}
    connection.query("select task.id_task, task.name, task.desc, categories.categories, CAST(deadline AS CHAR) as dline, status.status , status.status_color as color from task inner join worker on task.fk_id_worker = worker.id_worker inner join categories on fk_id_categories = categories.id_categories inner join status on fk_id_status = status.id_status where worker.id_worker =  ?", [req.session.userid], function(error, results, fields) {
        res.render('board', {
            categ_name : categ_name,
            tasks : results,
            info : req.session.username,
            id: req.session.userid,
            department: req.session.department,
            role: req.session.role,
            dep_workers: dep_workers,
            first: 0,
            statuses : statuses
           })
    })
}

function addTask(task, user){
    console.log(typeof(task));
    console.log(task)
    if (typeof(task) == "object"){
        for (var i = 0;i < task.length; i++){
            connection.query("update task set fk_id_worker = ? where id_task = ?", [user ,task[i]]);
        }
    } 
    if (typeof(task) == "string") {
        connection.query("update task set fk_id_worker = ? where id_task = ?", [user ,task]);
    }
}

function deleteTask(task){
    if (typeof(task) == "object"){
        for (var i = 0;i < task.length; i++){
            connection.query("update task set fk_id_worker = null where id_task = ?", [task[i]]);
        }
    } 
    if (typeof(task) == "string"){
        connection.query("update task set fk_id_worker = null where id_task = ?", [task]);
    }
}
function newTask(info){
    connection.query("insert into task(task.desc,deadline, fk_id_status, fk_id_categories, fk_id_worker) values(?,?,?,?,?)", [info.body.descValue, info.body.deadlineValue, info.body.taskCATEG_ID, info.body.taskSTATUS_ID, info.session.userid])
}

function changeTask(info){
    connection.query("update task set task.desc = ? , deadline = ?, fk_id_categories = ?, fk_id_status = ? where id_task = ?", [info.taskDESC, info.taskDEADLINE, info.taskCATEG_ID, info.taskSTATUS_ID, info.taskID])
}

app.get("/report", async (req, res) => {
    let urlRequest = url.parse(req.url, true);
    let idTasksArray = urlRequest.query.tasks.split(",");
    const table = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph("Название")],
                    }),
                    new TableCell({
                        children: [new Paragraph("Описание")],
                    }),
                    new TableCell({
                        children: [new Paragraph("Ответственный")],
                    }),
                    new TableCell({
                        children: [new Paragraph("Дата выполнения")],
                    }),
                ],
            }),
        ],
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        }
    });
    let tables = [table];
    for (let i = 0; i< idTasksArray.length; i++){
        connection.query("select  id_task, task.name, task.desc, concat(lname,' ', fname, ' ' , mname) as fio , CAST(deadline AS CHAR) as dline from task inner join worker on fk_id_worker = id_worker where id_task = ?", [idTasksArray[i]], function(error, results, fields){
            let tablec = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph(results[0].name)],
                            }),
                            new TableCell({
                                children: [new Paragraph(results[0].desc)],
                            }),
                            new TableCell({
                                children: [new Paragraph(results[0].fio)],
                            }),
                            new TableCell({
                                children: [new Paragraph(results[0].dline)],
                            }),
                        ],
                    }),
                ],
                width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                }
            });
            tables.push(tablec);
        })
    };
    setTimeout(async() => {
        const doc = new Document({
            sections: [{
                children: tables,
            }],
        });
    
        const b64string = await Packer.toBase64String(doc);
        
        res.setHeader('Content-Disposition', 'attachment; filename=report.docx');
        res.send(Buffer.from(b64string, 'base64'));
    }, 1000);

})
