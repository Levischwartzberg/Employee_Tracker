const inquirer = require("inquirer");
const mysql = require('mysql');
const passcode = require('./creds.js');

const Employee = require('./classes/Employee');
const Department = require('./classes/Department');
const Role = require('./classes/Role');

const rolesOptions = [];
const employeesOptions = [];
const departmentsOptions = [];
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
    // connection.end();
  });
  
  const afterConnection = () => {
      connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        // console.log(res[0].manager_id);
        for (i=0; i<res.length; i++) {
            let employee = new Employee(res[i].id, res[i].first_name, res[i].last_name, res[i].role_id, res[i].manager_id);
            employeesOptions.push(`ID: ${employee.Id} ${employee.firstName} ${employee.lastName}`);
            employees.push(employee);
        }
        employees.unshift("N/A");
      });
      connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        for (i=0; i<res.length; i++) {
            let role = new Role(res[i].id, res[i].title, res[i].salary, res[i].department_id);
            rolesOptions.push(role.title);
            roles.push(role);
        }
        // console.log(roles);
      });
      connection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        for (i=0; i<res.length; i++) {
            let department = new Department(res[i].id, res[i].dept_name);
            departmentsOptions.push(department.name);
            departments.push(department);
        }
        // console.log(departments);
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
        choices: rolesOptions
    },
    {
        type: 'list',
        message: 'Choose an Employee Manager, if Applicable',
        name: 'manager',
        choices: employeesOptions
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
        choices: departmentsOptions
    }
]

const changeRole = [
    {
        type: 'list',
        message: 'Choose the new role for the Employee',
        name: 'role',
        choices: roles
    },
    {
        type: 'list',
        message: 'Update the Manager, if Necessary',
        name: 'manager',
        choices: employees
    },
]

const addDepartment = [
    {
        type: 'input',
        message: "Enter the Department Name",
        name: 'department'
    }
]

//prompts
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

function addEmpDepOrRole(option) {
    console.log(option);
    if (option === "Add Employee") {
        inquirer
            .prompt(addEmployee)
            .then( (response) =>
            {
                appendEmployee(response.firstName, response.lastName, convertRole(response.role), convertManager(response.manager));
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
    if (option === "Update Role") {
        inquirer
            .prompt(changeRole)
            .then( (response) =>
            {
                console.log(response);
            })
    }
    if (option === "Update Manager") {
        inquirer
            .prompt(changeRole[1])
            .then( (response) =>
            {
                console.log(response);
            })
    }
}

//misc
function convertRole(role) {
    for (i=0; i<roles.length; i++) {
        if (role === roles[i].title) {
            return roles[i].roleId;
        }
    }
}

function convertManager(manager) {
    for (i=0; i<roles.length; i++) {
        if (manager === `ID: ${employees[i].Id} ${employees[i].firstName} ${employees[i].lastName}`) {
            return employees[i].Id
        }
    }
}

//queries
const appendEmployee = (firstName, lastName, roleId, managerId) => {
    const query = connection.query(
      'INSERT INTO employees SET ?',
      {
        first_name: firstName,
        last_name: lastName,
        role_id: roleId,
        manager_id: managerId
      },
      (err, res) => {
        if (err) throw err;
        console.log(`You've succesfully added new employee, ${firstName} ${lastName}!`);
      }
    );
    connection.end();

  };

const updateEmployeeRole = (role, employee_id) => {
    const query = connection.query(
      'UPDATE employees SET ? WHERE ?',
      [
        {
          role_id: role,
        },
        {
          id: employee_id,
        },
      ],
      (err, res) => {
        if (err) throw err;
        console.log(`You've succesfully updated`);
      }
    )
    connection.end();
};

function viewEmployees(option) {
    console.log(option);
}

//start application
startQuestions();