const { response } = require('express');
const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

// Connect with mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'testuser',
    password: 'testuser',
    database: 'myDb'
});

db.connect((err) => {
    if(err) throw err;
    console.log('Mysql is connected 😎');
})

app.get('/', (request, response) => {
    response.send('Welcome to mySql')
})

// Create a database
app.get('/createdb', (request, response) => {
    const sql = 'Create database testDB';
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result);
        response.send('DB is created')
    })
});

// Create a table
app.get('/createPostsTable', (request, response) => {
    const sql = 'Create table posts (id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result);
        response.send('Posts table created')
    })
});

// Insert to table posts
app.get('/addpost', (request, response) => {
    const sql = "Insert into posts(title, body) values ('post1', 'This is the post #1')"
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result);
        response.send('It works')
    })
});

// Insert dynamic data
app.get('/addpost2', (request, response) => {
    const { title, body } = request.body;
    const sql = `Insert into posts (title, body) values ('${title}', '${body}')`;
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result);
        response.send('One post inserted')
    })
});

// Getting the data from myDb
app.get('/getData', (request, response) => {
    const sql = 'Select * from posts';
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result[3].body);

        response.json(result)
    })
});

// Get id with request.params
app.get('/getOneRow/:id',(request,response) => {
    const sql = `select * from posts where id = ${request.params.id}`;
    console.log(sql);
    db.query(sql, (err , result) => {
       if(err) throw err ;
       response.json(result)
    })
});
// Get id with request.query
app.get('/getOneRow',(request,response) => {
    const sql = `select * from posts where id = ${request.query.id}`;
    console.log(sql);
    db.query(sql, (err , result) => {
       if(err) throw err ;
       response.json(result)
    })
});

// Update a row
app.get('/', (request, response) => {
    const sql = ` Update posts set title = 'mysql', body = 'mySQL is very cool and easy' where id = ${request.body.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        
        response.json({msg: 'Data updated'})
    })
})
app.listen(5000, () => {
    console.log('Server started on port 5000');
});