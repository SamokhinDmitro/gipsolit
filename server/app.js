/*Server for gipsolit*/

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const Result= require('./result');
const PORT = process.env.PORT || 3010;
const app = express();


let options = {
    host: 'remotemysql.com',
    user: 'LHQDWIITZo',
    port: 3306,
    password: '4oggbEu2Xb',
    database: 'LHQDWIITZo'
};

let connection = mysql.createPool(options);

//let corsOptions = {
//   origin: ['https://samokhindmitro.github.io/gipsolit'],
 //   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//};

//app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
   res.send('Домашняя страница');
});

app.get('/clients', (req,res) => {
    connection.query('SELECT * FROM clients', function(error, rows) {
        if(error) throw new  Error(error);
        res.send(rows);
    });
});

//Info by client
app.post('/clients', function(req,res) {

    let input = req.body;

    let data = {
        name: input.name,
        email: input.email ? input.email : '',
        phone: input.phone,
        message: input.message ? input.message : ''
    };


    connection.query('INSERT INTO  clients SET ?',[data], function(error, rows) {
        if(error) throw new  Error(error);
        res.redirect('/clients');
    });

});

//Calculator
app.post('/calc', function(req,res) {

    let input = req.body;

    let place = input.place;
    let size = input.size;
    let roller = input.roller;

    //Calculator Math
    let result = new Result(place, roller, size);
   let data = {
     place: place,
     roller: roller,
     size: size,
     result: result.costWorks()
   };


   res.send(JSON.stringify(data));
});


//404
app.use(function(req, res, next){
    res.status(404).send('Нет такой страницы повторите ввод!');
});

app.listen(PORT, function(){
    console.log(`Прослушиваем порт по адрессу ${PORT}`);
});
