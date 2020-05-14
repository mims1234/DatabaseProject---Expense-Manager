const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const moment = require("moment");

const session = require("express-session");
const bcrypt = require("bcrypt-nodejs");
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const databaseSet = process.env.DB;

const {getLoginPageParams,getAuthLogin,getAuthReg,getLoginPage,getLogoutCheck} = require('./routes/login');
const {getMainPage} = require('./routes/main');
const {getAuthIncome,getAuthExpense,getAuthBudget} = require('./routes/insert');
const {getIncomePage,getExpensePage} = require('./routes/pages');


//DB Credentials
const db = mysql.createConnection({
        host: 'localhost',
        user: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASS}`,
        database: `${databaseSet}`,
        port: `${process.env.DB_PORT}`
})

app.use(session({
    secret  :'secret',
    resave  :true,
    saveUninitialized   :true
}))

//DB connection
db.connect((err) => {
    if(err) throw err;
    console.log(`Connected to *${databaseSet}* Database`)
})
global.db = db; 
//global.ses = session();

//Configuring Middleware
app.set('port',port);
app.set('views',__dirname + "/views");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname+'/public')));

app.get('/test', function(req,res) {
    score = [["Groceries",10],["Groceries",10]]
    return res.send(`Debugging Test` + ` ${score[0][0]}`)
});

//Routes - MAIN
app.get('/main:id', getMainPage);

//Routes - Pages
app.post('/income', getIncomePage);
app.post('/expense', getExpensePage);

//Routes - INSERT
app.post('/authAI', getAuthIncome);
app.post('/authAE', getAuthExpense);
app.post('/authAB', getAuthBudget);

//Routes - HOME
app.post('/authL', getAuthLogin);
app.post('/authR', getAuthReg);
app.post('/logout',getLogoutCheck)
app.get('/', getLoginPage);
app.get('/:id', getLoginPageParams);

//Routes - TEST
// app.get('/test', function(req,res) {
//     Lifetime = moment().subtract(365*50, 'days').format("YYYY-MM-DD")
//     Year = moment().subtract(1, 'year').format("YYYY-MM-DD")
//     Month = moment().subtract(2, 'month').format("YYYY-MM-DD")
//     Week = moment().subtract(7, 'days').format("YYYY-MM-DD")
//     Today = moment().format("YYYY-MM-DD")
//     Tommorow = moment().add(1, 'days').format("YYYY-MM-DD")
//     DateTest = moment().subtract(61, 'days').format("YYYY-MM-DD")
//     score = ["hello","batman"]
//     res.render('test.ejs',{
//         user: 'test', text:`Tester`,score,
//         Lifetime,Year,Month,Week,Today,DateTest,Tommorow
//     })
// });

//Listening Port

app.listen(port , () => {
    console.log(`Listening to Port ${port}`);
    console.log(`Listening to DB_Port ${process.env.DB_PORT}`);
})

