class Employee {
    constructor(firstName, lastName, roleId, managerId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.managerId = managerId;

        if (typeof firstName !== "string" || !firstName.trim().length) {
            throw new Error("Expected parameter 'name' to be a non-empty string");
          }
        if (typeof lastName !== "string" || !lqstName.trim().length) {
        throw new Error("Expected parameter 'name' to be a non-empty string");
        }
        if (typeof roleId !== "number") {
            throw new Error("Expected parameter roleId to be an integer.");
          }
        if (typeof managerId !== "number" || managerId !== undefined) {
            throw new Error("Expected parameter managerId to be either an integer or null.");
          } 
    }
}

module.exports = Employee;
