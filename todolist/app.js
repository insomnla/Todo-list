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
const {ensureDirector} = require('./config/auth'); 
const {ensureDepDirector} = require('./config/auth'); 
const { connect } = require("http2");
const { worker } = require("cluster");
const { query } = require("express");
const { profile } = require('console');
let worker_single = 0,
    worker_id = [0],
    socket_id = [0],
    dep_workers = 0;
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))
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
    socket.on("new_task", (data)=>{
       // console.log(data + " " + socket_id[worker_id.indexOf(data)]);
       // console.log(worker_id.indexOf(data) + " " + worker_id.indexOf(1))
       if (data.worker !== data.director){
            console.log(data);
            socket.to(socket_id[worker_id.indexOf(data.worker)]).emit('new_task', data.director + " добавил(а) вам задание " + data.desc); 
            connection.query("INSERT INTO notification (fk_id_sender, fk_id_receiver, message, checked, fk_id_notif_type) values (?,?,?,0 , 1)", [data.director_id, data.worker, data.desc]);
       }
    })
    socket.on("plea_upd", (data)=>{ 
        if (data.respond == "ДА"){
            socket.to(socket_id[worker_id.indexOf(Number(data.worker))]).emit('plea_upd', "Ваша справка " + data.desc  + " готова");
            connection.query("INSERT INTO notification (fk_id_sender, fk_id_receiver, message, checked, fk_id_notif_type) values (?,?,?,0 , 2)", [data.sender, data.worker, data.desc]);
        } 
        if (data.respond == "НЕТ"){
            socket.to(socket_id[worker_id.indexOf(Number(data.worker))]).emit('plea_upd', "В справке " + data.desc  + " было отказано");
            connection.query("INSERT INTO notification (fk_id_sender, fk_id_receiver, message, checked, fk_id_notif_type) values (?,?,?,0 , 3)", [data.sender, data.worker, data.desc]);
        }
        if (data.respond == "РАССМОТРЕНИЕ"){
            socket.to(socket_id[worker_id.indexOf(Number(data.worker))]).emit('plea_upd', "Ваша справка " + data.desc  + " принята на рассмотрение");
            connection.query("INSERT INTO notification (fk_id_sender, fk_id_receiver, message, checked, fk_id_notif_type) values (?,?,?,0 , 4)", [data.sender, data.worker, data.desc]);
        }
        if (data.respond == "ДА_ОТПУСК"){
            socket.to(socket_id[worker_id.indexOf(Number(data.worker))]).emit('vac_upd', "Ваш " + data.desc  + " был принят");
            connection.query("INSERT INTO notification (fk_id_sender, fk_id_receiver, message, checked, fk_id_notif_type) values (?,?,?,0 , 5)", [data.sender, data.worker, data.desc]);
        } 
        if (data.respond == "НЕТ_ОТПУСК"){
            socket.to(socket_id[worker_id.indexOf(Number(data.worker))]).emit('vac_upd', "В " + data.desc  + " было отказано");
            connection.query("INSERT INTO notification (fk_id_sender, fk_id_receiver, message, checked, fk_id_notif_type) values (?,?,?,0 , 6)", [data.sender, data.worker, data.desc]);
        }
        if (data.respond == "РАССМОТРЕНИЕ_ОТПУСК"){
            socket.to(socket_id[worker_id.indexOf(Number(data.worker))]).emit('vac_upd', "Ваш " + data.desc  + " принят на рассмотрение");
            connection.query("INSERT INTO notification (fk_id_sender, fk_id_receiver, message, checked, fk_id_notif_type) values (?,?,?,0 , 7)", [data.sender, data.worker, data.desc]);
        }
    });
    socket.on("new_vacation", (data)=>{
        newPlea("3", data.worker, data.start + " - " + data.end);
    });
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
    getVacation(req,res);
})

app.post('/vacation',  ensureAuthenticated, (req, res) => {
    newVacation(req.body, req.session.userid);
    getVacation(req,res);
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

app.get("/plea", ensureAuthenticated, (req, res) => {
    getPlea(req,res);
})

app.get("/all_pleas", ensureAuthenticated, (req, res) => {
    getAllPleas(req,res);
})


app.post("/new_plea", ensureAuthenticated, (req, res) => {
    getPlea(req,res);
    newPlea(req.body.categ_id, req);
})

app.post("/notif_check", ensureAuthenticated, (req,res)=>{
    connection.query("update notification set checked = 1 where id_notif = ?", [req.body.id]);
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
    getProfile(req, res);
})

app.post("/deadline_check", ensureAuthenticated, (req,res)=>{
    if (req.body.idArray !== undefined){
        console.log(req.body.idArray)
        for (var i = 0; i < req.body.idArray.length; i++){
            connection.query("update task set fk_id_status = 3 where id_task = ?", [req.body.idArray[i]]);
        }
    }
})

app.post("/profile", ensureAuthenticated,(req, res)=>{
    getProfile(req,res);
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

app.post("/update_worker", ensureAuthenticated, (req, res)=>{
    changeWorker(req.body);
    getProfile(req, res);
})

app.post("/update_task", ensureAuthenticated, (req, res)=>{
    changeTaskPFP(req.body);
    getProfile(req, res);
})

app.post("/update_plea", ensureAuthenticated, (req,res)=>{
    pleaUpd(req.body);
    getAllPleas(req,res);
});

app.get("/department", ensureAuthenticated, (req,res)=>{
    getDeparment(req, res);
})

app.get("/direct_depart", ensureAuthenticated, ensureDepDirector, (req,res)=>{
    getDirectDepart(req, res);
})

app.post("/direct_depart", ensureAuthenticated, ensureDepDirector, (req,res)=>{
    getDirectDepart(req, res);
})


app.get("/director", ensureAuthenticated, ensureDirector, (req,res)=>{
    getDirector(req, res);
})

function getDirectDepart(req, res){
    dep_id = req.session.department;
    let urlRequest = url.parse(req.url, true);
    if (urlRequest.query.id  !== undefined){
        dep_id = urlRequest.query.id;
    }
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 0 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_unchecked = results;
    })
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 1 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_checked = results;
    })
    connection.query("select fk_id_department ,id_worker, concat(lname, ' ', fname, ' ', mname) as fio from worker where fk_id_department = ?", [dep_id], function(error, results, fields){
        dep_workers = results;
    }) 
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
    connection.query("select id_worker, id_task, concat(lname,' ' ,fname,' ', mname) as fio, categories.categories, task.name, task.desc, CAST(deadline AS CHAR) as dline , status from task inner join worker on fk_id_worker = id_worker inner join categories on fk_id_categories = id_categories inner join status on fk_id_status = id_status inner join department on fk_id_department = id_department where fk_id_department = ?", [dep_id], function(error, results, fields) {
        res.render('direct_depart', {
            categ_name : categ_name,
            tasks : results,
            info : req.session.username,
            id: req.session.userid,
            department: req.session.department,
            notifications_unchecked: notifications_unchecked,
            notifications_checked : notifications_checked,
            role: req.session.role,
            dep_workers: dep_workers,
            first: 0,
            statuses : statuses
           })
    })
}

function getDeparment(req, res){
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 0 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_unchecked = results;
    })
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 1 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_checked = results;
    })
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
         notifications_unchecked, notifications_unchecked,
         notifications_checked, notifications_checked,
         role: req.session.role,
         first: 0,
         statuses : statuses
    })
})
}

function getBoard(req, res){
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 0 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_unchecked = results;
    })
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 1 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_checked = results;
    })
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
            notifications_unchecked: notifications_unchecked,
            notifications_checked : notifications_checked,
            first: 0,
            statuses : statuses
           })
    })
}
function getDirector(req, res){
    connection.query("select * from categories", function(eror, results, fields){
        categ_name = results;
    })
    connection.query("select * from status", function(error, results, field){
        statuses = results;
    })
    connection.query("select count(*) as counter, department_name from worker join department on fk_id_department = id_department  where fk_id_department <> 0 and fk_id_role <> 3 group by fk_id_department", function(error, results, field){
        dep_count = results;
    })
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 0 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_unchecked = results;
    })
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 1 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_checked = results;
    })
    if (!(req.body.taskName == undefined)){
        console.log("TRUE")
        connection.query("INSERT INTO task (task.name, task.desc, deadline, fk_id_worker, fk_id_categories) VALUES(?,?,?,?,?)", [req.body.taskName, req.body.taskDesc, req.body.taskDeadline, req.session.userid, req.body.categories]);
    }
    connection.query("select id_department, id_worker, lname, fname, mname, department_name from worker join department on fk_id_department = id_department where fk_id_role = 2", function(error, results, fields) {
        res.render('director', {
            categ_name : categ_name,
            dep_directors : results,
            info : req.session.username,
            id: req.session.userid,
            department: req.session.department,
            notifications_unchecked: notifications_unchecked,
            notifications_checked : notifications_checked,
            dep_count : dep_count,
            role: req.session.role,
            first: 0,
            statuses : statuses
           })
    })
}

function getVacation(req,res){
    connection.query("select this_year_holydays as holydays from holydays", function(error, results, field){
        holydays = results;
    })
    connection.query("select start_date, end_date, vac_status from vacation inner join vac_status on fk_id_vac_status = id_vac_status where fk_id_worker = ?",[req.session.userid], function(error, results, field){
        vacation_duration = results;
    })
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 0 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_unchecked = results;
    })
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 1 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_checked = results;
    })
    connection.query("select vacation_left from worker where id_worker = ?",[req.session.userid], function(error, results, field){
        res.render('vacation', {
            holydays : holydays,
            vac_left : results,
            id : req.session.userid,
            info: req.session.username,
            notifications_unchecked: notifications_unchecked,
            notifications_checked : notifications_checked,
            vac_dur : vacation_duration,
            role : req.session.role
        })
    })
}

function addTask(task, user){
    console.log(typeof(task));
    console.log(task)
    if (typeof(task) == 'object'){
        for (var i = 0;i < task.length; i++){
            connection.query("update task set fk_id_worker = ? where id_task = ?", [user ,task[i]]);
        }
    } 
    if (typeof(task) == 'string') {
        console.log(task, user, "string");
        connection.query("update task set fk_id_worker = ? where id_task = ?", [user ,task]);
    }
}

function deleteTask(task){
    if (typeof(task) == "object"){
        console.log("object");
        for (var i = 0;i < task.length; i++){
            connection.query("update task set fk_id_worker = null where id_task = ?", [task[i]]);
        }
    } 
    if (typeof(task) == "string"){
        console.log("string");
        connection.query("update task set fk_id_worker = null where id_task = ?", [task]);
    }
}
function newTask(info){
    if (info.body.employee_id == -1){
        connection.query("insert into task(task.name, task.desc,deadline, fk_id_status, fk_id_categories, fk_id_worker) values(?,?,?,?,?,?)", [info.body.nameValue ,info.body.descValue, info.body.deadlineValue, info.body.taskCATEG_ID, info.body.taskSTATUS_ID, info.session.userid]);
    } else {
        connection.query("insert into task(task.name, task.desc,deadline, fk_id_status, fk_id_categories, fk_id_worker) values(?,?,?,?,?,?)", [info.body.nameValue ,info.body.descValue, info.body.deadlineValue, info.body.taskCATEG_ID, info.body.taskSTATUS_ID, info.body.employee_id]);
    }
}
function changeTask(info){
    connection.query("update task set task.desc = ? , deadline = ?, fk_id_categories = ?, fk_id_status = ? where id_task = ?", [info.taskDESC, info.taskDEADLINE, info.taskCATEG_ID, info.taskSTATUS_ID, info.taskID])
}

app.get("/report", async (req, res) => {
    let urlRequest = url.parse(req.url, true);
    let idTasksArray = urlRequest.query.tasks.split(",");
    if (idTasksArray[0] == ""){
        idTasksArray.splice(0, 1)
    }
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

function changeTaskPFP(info){
    connection.query("update task set name = ?, task.desc = ?, deadline = ?, fk_id_worker = ?, fk_id_categories = ? , fk_id_status = ? where id_task = ?",[info.name, info.desc, info.deadline, info.worker_id, info.categories_id, info.statuses_id, info.task_id]);
}

function changeWorker(info){
    connection.query("update worker set lname = ?, fname = ?, mname = ?, mail = ?, fk_id_role = ?, fk_id_department = ?, number = ?, room = ? where id_worker = ?",[info.fio_new[0], info.fio_new[1], info.fio_new[2], info.mail, info.userROLE_ID, info.userDEPARTMENT_ID, info.phone, info.room ,info.worker_id]);
}

function getProfile(req, res){
    profile_id = req.session.userid
    let urlRequest = url.parse(req.url, true);
    if (urlRequest.query.id !== undefined){
        profile_id = urlRequest.query.id;
    }
    connection.query("select * from categories", function(eror, results, fields){
        categ_name = results;
    })
    connection.query("select * from status", function(error, results, field){
        statuses = results;
    })
    connection.query("select * from department", function(eror, results, fields){
        departments = results;
    })
    connection.query("select * from role", function(eror, results, fields){
        roles = results;
    })
    connection.query("select id_worker, lname, fname, mname from worker where id_worker = ?", [req.session.userid], function(error, results, field){
        guest_info = results;
    })
    connection.query("select id_worker, lname, fname, mname, mail, role.role, department_name, number, room from worker inner join department on fk_id_department = id_department inner join role on id_role = fk_id_role", function(error, results, fields){
        all_workers = results;
    })
    connection.query("select lname, fname, mname, mail, role, department_name, number, room from worker inner join role on id_role = fk_id_role inner join department on id_department = fk_id_department where id_worker = ? ", [profile_id], function(error,results,fields){
        user_profile = results;
    })
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 0 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_unchecked = results;
    })
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 1 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_checked = results;
    })
    connection.query("select id_task, task.name, task.desc, CAST(deadline AS CHAR) as dline, concat(lname, ' ', fname, ' ' , mname) as fio, categories, status from task inner join categories on fk_id_categories = id_categories inner join status on id_status = fk_id_status inner join worker on id_worker = fk_id_worker", function(error, results, fields) {
        all_tasks = results;
    })
    connection.query("select id_task, categories.categories, task.desc, CAST(deadline AS CHAR) as dline, status.status from task inner join status on fk_id_status = id_status inner join categories on fk_id_categories = id_categories where fk_id_worker = ? and status = 'Активен'", [profile_id], function(error, results, fields) {
        res.render('profile', {
            guest_info : guest_info,
            user_profile : user_profile,
            categories : categ_name,
            statuses : statuses,
            id : req.session.userid,
            departments : departments,
            notifications_unchecked: notifications_unchecked,
            notifications_checked : notifications_checked,
            roles : roles,
            all_tasks : all_tasks,
            all_workers : all_workers,
            tasks : results,
            role : req.session.role
        })
    })
}

function getAllPleas(req,res){
    connection.query("select * from plea_categ", function(error, results, fields){
        plea_categ = results;
    })
    connection.query("select * from plea_status", function(error, results, fields){
        plea_status = results;
    })
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 0 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_unchecked = results;
    })
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 1 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_checked = results;
    })
    connection.query("select fk_id_worker, id_plea, plea_categ, plea_status, extra, concat(lname,' ' ,fname,' ', mname) as fio, id_plea_status  from pleas inner join plea_categ on fk_id_plea_categ = id_plea_categ inner join plea_status on fk_id_plea_status = id_plea_status inner join worker on fk_id_worker = id_worker  ORDER BY id_plea DESC", function(error, results, fields) {
        res.render('all_pleas', {
            pleas : results,
            plea_categ : plea_categ,
            plea_status : plea_status,
            info : req.session.username,
            id: req.session.userid,
            department: req.session.department,
            role: req.session.role,
            notifications_unchecked: notifications_unchecked,
            notifications_checked : notifications_checked,
            first: 0,
           })
    })
}

function getPlea(req, res){
    connection.query("select * from plea_categ", function(error, results, fields){
        plea_categ = results;
    })
    connection.query("select * from plea_status", function(error, results, fields){
        plea_status = results;
    })
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 0 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_unchecked = results;
    })
    connection.query("select id_notif, message, lname, fname, mname, checked, fk_id_notif_type as type from notification inner join worker on fk_id_sender = id_worker where fk_id_receiver = ? and checked = 1 ORDER BY id_notif DESC", [req.session.userid], function(error, results, fields){
        notifications_checked = results;
    })
    connection.query("select * from pleas inner join plea_categ on fk_id_plea_categ = id_plea_categ inner join plea_status on fk_id_plea_status = id_plea_status where fk_id_worker = ? ",[req.session.userid], function(error, results, fields) {
        res.render('plea', {
            pleas : results,
            plea_categ : plea_categ,
            plea_status : plea_status,
            info : req.session.username,
            id: req.session.userid,
            department: req.session.department,
            role: req.session.role,
            notifications_unchecked: notifications_unchecked,
            notifications_checked : notifications_checked,
            first: 0,
           })
    })
}

function newPlea(categ_id, req, extra){
    if (extra !== undefined){
        connection.query("insert into pleas (fk_id_worker, fk_id_plea_categ, fk_id_plea_status, extra) values(?,?,0,?)",[req, categ_id, extra]);
    } else {
        connection.query("insert into pleas (fk_id_worker, fk_id_plea_categ, fk_id_plea_status) values(?,?,0)",[req.session.userid, categ_id]);
    } 
}

function pleaUpd(info){
    console.log(info);
    if (info.respond == "ДА" && info.dates == undefined){
        connection.query("update pleas set fk_id_plea_status = 2 where id_plea = ? ",[info.id]);
    }
    if (info.respond == "НЕТ" && info.days == undefined){
        connection.query("update pleas set fk_id_plea_status = 3 where id_plea = ? ",[info.id]);
    }
    if (info.respond == "РАССМОТРЕНИЕ"){
        connection.query("update pleas set fk_id_plea_status = 1 where id_plea = ? ",[info.id]);
    }
    if (info.days !== undefined && info.respond == "НЕТ"){
        connection.query("update worker set vacation_left = vacation_left + ? where id_worker = ?",[info.days, info.worker])
        connection.query("delete from vacation where fk_id_worker = ? and start_date = ? and end_date = ? ",[info.worker, info.dates[0], info.dates[1]])
        connection.query("update pleas set fk_id_plea_status = 3 where id_plea = ? ",[info.id]);
    }
    if (info.dates !== undefined && info.respond == "ДА"){
        connection.query("update vacation set fk_id_vac_status = 2 where start_date = ? and end_date = ? and fk_id_worker = ?",[info.dates[0], info.dates[1], info.worker])
        connection.query("update pleas set fk_id_plea_status = 2 where id_plea = ? ",[info.id]);
    }
}

function newVacation(info, user){
    connection.query("insert into vacation(start_date,end_date, fk_id_worker, fk_id_vac_status) values(?,?,?,?)", [info.start, info.end, user, info.status]);
    connection.query("update worker set vacation_left = vacation_left - ? where id_worker = ?", [info.days, user]);
}