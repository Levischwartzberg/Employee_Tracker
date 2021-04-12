const inquirer = require("inquirer");
const mysql = require('mysql');
const passcode = require('./creds.js');

const Employee = require('./classes/Employee');
const Department = require('./classes/Department');
const Role = require('./classes/Role');

const roles = [];
const employees = [];
const departments = [];

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
      connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        console.log(res[0].manager_id);
        for (i=0; i<res.length; i++) {
            let employee = new Employee(res[i].id, res[i].first_name, res[i].last_name, res[i].role_id, res[i].manager_id);
            employees.push(`ID: ${employee.Id} ${employee.firstName} ${employee.lastName}`);
        }
        console.log(employees);
      });
      connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        for (i=0; i<res.length; i++) {
            let role = new Role(res[i].id, res[i].title, res[i].salary, res[i].department_id);
            roles.push(role.title);
        }
        console.log(roles);
      });
      connection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        for (i=0; i<res.length; i++) {
            let department = new Department(res[i].id, res[i].dept_name);
            departments.push(department.name);
        }
        console.log(departments);
      });
    };

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
        choices: roles
    },
    {
        type: 'list',
        message: 'Choose an Employee Manager, if Applicable',
        name: 'manager',
        choices: employees
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
        choices: departments
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