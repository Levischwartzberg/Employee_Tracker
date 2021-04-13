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
    rolesOptions.splice(0, rolesOptions.length);
    employeesOptions.splice(0, employeesOptions.length);
    departmentsOptions.splice(0, departmentsOptions.length);
    roles.splice(0, roles.length);
    employees.splice(0, employees.length);
    departments.splice(0, departments.length);
      connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        // console.log(res[0].manager_id);
        for (i=0; i<res.length; i++) {
            let employee = new Employee(res[i].id, res[i].first_name, res[i].last_name, res[i].role_id, res[i].manager_id);
            employeesOptions.push(`ID: ${employee.Id} ${employee.firstName} ${employee.lastName}`);
            employees.push(employee);
        }
        employeesOptions.unshift("N/A");
        employeesOptions.push("none");
        // console.log(employees);
        // console.log(employeesOptions);
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
        departmentsOptions.push("N/A");
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
        message: 'Which employee would you like to update?',
        name: 'option',
        choices: employeesOptions
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
        choices: rolesOptions
    },
    {
        type: 'list',
        message: 'Update the Manager (choose N/A if there is no change, none for no manager)',
        name: 'manager',
        choices: employeesOptions
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
            let employee = "";
            inquirer
                .prompt(initialQuestions[3])
                .then( (response) =>
                {
                    employee = response.option;
                    console.log(employee);
                    inquirer
                        .prompt(initialQuestions[4])
                        .then( (response) =>
                        {
                            console.log(response.option + employee);
                            update(response.option, employee);
                        })  
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
                appendEmployee(response.firstName, response.lastName, convertRole(response.role), convertEmployee(response.manager));
            })
    } 
    if (option === "Add Role") {
        inquirer
            .prompt(addRole)
            .then( (response) =>
            {
                if (response.department === "N/A") {
                    console.log("Add a department before you add a new role, or choose an existing department.")
                    addEmpDepOrRole("Add Department");
                }
                else {
                    appendRole(response.role, response.salary, convertDepartment(response.department));
                }
            })
        }
    if (option === "Add Department") {
        inquirer
            .prompt(addDepartment)
            .then( (response) =>
            {
                appendDepartment(response.department);
            })
        }     
}

function update(option, employee) {
    if (option === "Update Role") {
        inquirer
            .prompt(changeRole)
            .then( (response) =>
            {
                console.log(response.role);
                updateEmployeeRole(convertRole(response.role), convertEmployee(employee), convertEmployee(response.manager));
            })
    }
    if (option === "Update Manager") {
        inquirer
            .prompt(changeRole[1])
            .then( (response) =>
            {
                updateEmployeeManager(convertEmployee(employee), convertEmployee(response.manager))
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

function convertDepartment(role) {
    for (i=0; i<departments.length; i++) {
        if (role === departments[i].name) {
            return departments[i].deptId;
        }
    }
}

function convertEmployee(employee) {
    if (employee === "N/A") {
        return "N/A";
    }
    else if (employee === "none") {
        return "none";
    }
    else {
        for (i=0; i<employees.length; i++) {
            if (employee === `ID: ${employees[i].Id} ${employees[i].firstName} ${employees[i].lastName}`) {
                return employees[i].Id
            }
        }
    }
}

function viewEmployees(option) {
    if (option === "View All Employees") {
        viewAll();
    }
    else if (option === "View Employees by Role") {
        inquirer
        .prompt({
            type: 'list',
            message: 'Choose the role to view employees by.',
            name: 'role',
            choices: rolesOptions
        })
        .then( (response) =>
        {
            viewByRole(convertRole(response.role));
        })
    }
    else if (option === "View Employees by Department") {
        inquirer
        .prompt({
            type: 'list',
            message: 'Choose the department to view employees by.',
            name: 'department',
            choices: departmentsOptions
        })
        .then( (response) =>
        {
            viewByDepartment(convertDepartment(response.department));
        })
    }
}

function goOn() {
    inquirer
        .prompt({
            type: 'list',
            message: "Would you like to continue viewing or operating on the database?",
            name: 'continue',
            choices: ["Yes", "No"]
        })
        .then( (response) =>
        {
            if (response.continue === "Yes") {
                console.log("test")
                afterConnection();
                startQuestions();
            }
            else {
                connection.end();
            }
        })
}

//queries
const appendEmployee = (firstName, lastName, roleId, managerId) => {
    if (managerId === "none") {
        managerId = 0;
    }
    if (managerId === "N/A") {
        managerId = 0;
    }
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
    goOn();
  };

const appendDepartment = (department) => {
const query = connection.query(
    'INSERT INTO departments SET ?',
    {
    dept_name: department
    },
    (err, res) => {
    if (err) throw err;
    console.log(`You've succesfully added a new department, ${department}!`);
    }
);
goOn();
};

const appendRole = (role, salary, department) => {
const query = connection.query(
    'INSERT INTO roles SET ?',
    {
    title: role,
    salary: salary,
    department_id: department
    },
    (err, res) => {
    if (err) throw err;
    console.log(`You've succesfully added a new role, ${role}!`);
    }
);
goOn();
};

const updateEmployeeRole = (role, employee_id, manager) => {
    if (manager === "N/A") {
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
            console.log(`You've succesfully updated the role.`);
        }
        )
    } 
    else {
    const query = connection.query(
        'UPDATE employees SET ? WHERE ?',
        [
            {
            role_id: role,
            manager_id: manager,
            },
            {
            id: employee_id,
            },
        ],
        (err, res) => {
            if (err) throw err;
            console.log(`You've succesfully updated the role.`);
        }
        )
    }
    goOn();
};

const updateEmployeeManager = (employee_id, manager) => {
    if (manager === "none") {
        manager = 0;
    }
    if (manager === "N/A") {
        connection.end();
        return;
    }
    else {
        const query = connection.query(
            'UPDATE employees SET ? WHERE ?',
            [
              {
                manager_id: manager,
              },
              {
                id: employee_id,
              },
            ],
            (err, res) => {
              if (err) throw err;
              console.log(`You've succesfully updated the manager`);
            }
          )
        }
    goOn();
};

const viewAll = () => {
    connection.query(`SELECT e.id, e.first_name, e.last_name, roles.title, roles.salary, departments.dept_name, CONCAT(m.first_name,' ',m.last_name) AS "Manager"
    FROM employees e
    LEFT JOIN employees m ON e.manager_id = m.id
    LEFT JOIN roles ON e.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id`, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
    goOn();
}

const viewByRole = (role) => {
    connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    WHERE employees.role_id = ${role}`, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
    goOn();
}

const viewByDepartment = (department) => {
    console.log(department);
    connection.query(`SELECT employees.id, employees.first_name, employees.last_name, departments.dept_name
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    WHERE roles.department_id = ${department}`, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
    goOn();
}


//start application
startQuestions();