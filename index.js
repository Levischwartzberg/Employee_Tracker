const inquirer = require("inquirer");
const mysql = require('mysql');
const passcode = require('./creds.js');

const initialQuestions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
        choices: ["View Employees", "Add Employees, Department, or Role", "Update Employee"]
    },
    {
        type: 'list',
        message: 'What would you like to view?',
        name: 'option',
        choices: ["View All Employees", "View Employees by Role", "View Employees by Department"]
    },
    {
        type: 'list',
        message: 'What would you like to add?',
        name: 'option',
        choices: ["Add Employee", "Add Role", "Add Department"]
    },
    {
        type: 'list',
        message: 'What would you like to update?',
        name: 'option',
        choices: ["Update Role", "Update Manager"]
    }
]

const addEmployee = [
    {
        type: 'input',
        message: 'Enter First Name',
        name: 'firstName'
    },
    {
        type: 'input',
        message: 'Enter Last Name',
        name: 'lastName'
    },
    {
        type: 'list',
        message: 'Choose a Role for the Employee',
        name: 'role',
        choices: []
    },
    {
        type: 'list',
        message: 'Choose an Employee Manager, if Applicable',
        name: 'manager',
        choices: []
    },
]

const addRole = [
    {
        type: 'input',
        message: "Enter the Role Title",
        name: 'role'
    },
    {
        type: 'input',
        message: "Enter the Role Salary",
        name: 'salary'
    },
    {
        type: 'list',
        message: 'Choose the Department for the Role',
        name: 'department',
        choices: []
    }
]

const addDepartment = [
    {
        type: 'input',
        message: "Enter the Department Name",
        name: 'department'
    }
]

function startQuestions() {
    inquirer
    .prompt(initialQuestions[0])
    .then( (response) =>
    {
        if (response.option === "View Employees") {
        inquirer
            .prompt(initialQuestions[1])
            .then( (response) =>
            {
                viewEmployees(response.option);
            })
        }
        if (response.option === "Add Employees, Department, or Role") {
        inquirer
            .prompt(initialQuestions[2])
            .then( (response) =>
            {
                addEmpDepOrRole(response.option);
            })
        }
        if (response.option === "Update Employee") {
        inquirer
            .prompt(initialQuestions[3])
            .then( (response) =>
            {
                update(response.option);
            })
        }     
    }
    )
}

function viewEmployees(option) {
    console.log(option);
}

function addEmpDepOrRole(option) {
    console.log(option);
    if (option === "Add Employee") {
        inquirer
            .prompt(addEmployee)
            .then( (response) =>
            {
                console.log(response);
            })
    } 
    if (option === "Add Role") {
    inquirer
        .prompt(addRole)
        .then( (response) =>
        {
            console.log(response);
        })
    }
    if (option === "Add Department") {
    inquirer
        .prompt(addDepartment)
        .then( (response) =>
        {
            console.log(response);
        })
    }     
}

function update(option) {
    console.log(option);
}

startQuestions();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: passcode,
    database: 'employeesDB',
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    afterConnection();
    connection.end();
  });
  
  const afterConnection = () => {
      connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        console.log(res);
        // data = res;
        // console.log(data[0].flavor);
      });
    };