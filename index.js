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
}

function update(option) {
    console.log(option);
}

startQuestions();