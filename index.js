const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@123',
    database: 'EmployeeDB'
});


mysqlconnection.connect((err)=>{
    if(!err)
    console.log('DB connection success..');
    else
    console.log('DB connection failed \n Error : '+ JSON.stringify(err, undefined,2));
});

app.listen(3000,()=>console.log('Express server is running at port no : 3000'));


//Get all Employee
app.get('/employees',(req,res)=>{
    mysqlconnection.query('SELECT * FROM Employee',(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);

    })
});


//Get an Employee
app.get('/employees/:id',(req,res)=>{
    mysqlconnection.query('SELECT * FROM Employee WHERE EmpID = ?'[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);

    })
});

//Delete an Employee
app.delete('/employees/:id',(req,res)=>{
    mysqlconnection.query('DELETE FROM Employee WHERE EmpID = ?'[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send('Deleted Successfully!');
        else
        console.log(err);

    })
});


//Insert an Employee
app.post('/employees',(req,res)=>{
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET  @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlconnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],(err, rows, fields)=>{
        if(!err)
        rows.foreach(element => {
            res.send('Inserted employee id : '+element[0].EmpID);
        });
        else
        console.log(err);

    })
});

//Update an Employee
app.post('/employees',(req,res)=>{
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET  @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlconnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],(err, rows, fields)=>{
        if(!err)
        rows.foreach(element => {
            res.send('Updated successfully');
        });
        else
        console.log(err);

    })
});