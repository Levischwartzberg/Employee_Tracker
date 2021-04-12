DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Johnson", 3, 4), ("Joe", "Schmo", 3, 4), ("Doug", "Smith", 3, 4), ("Emily", "Foster", 2, 15);

INSERT INTO roles (title, salary, department_id)
VALUES ("CEO", 1000000, 1), ("Project Manager", 250000, 2), ("Engineer", 100000, 2), ("Intern", 15000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 3), ("Salesperson", 75000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Account Manager", 150000, 4),("Accountant", 100000, 4), ("Legal Team Lead", 175000, 5), ("Lawyer", 125000, 5);

INSERT INTO departments (dept_name)
VALUES ("Executive"), ("Engineering"), ("Sales"), ("Finance"), ("Legal");

