class Employee {
    constructor(Id, firstName, lastName, roleId, managerId) {
        this.Id = Id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.managerId = managerId;

        // if (typeof Id !== "number") {
        //     throw new Error("Expected parameter Id to be an integer.");
        //   }
        // if (typeof firstName !== "string" || !firstName.trim().length) {
        //     throw new Error("Expected parameter 'firstName' to be a non-empty string");
        //   }
        // if (typeof lastName !== "string" || !lastName.trim().length) {
        // throw new Error("Expected parameter 'lastName' to be a non-empty string");
        // }
        // if (typeof roleId !== "number") {
        //     throw new Error("Expected parameter roleId to be an integer.");
        //   }
        // if (typeof managerId !== "number" || managerId !== undefined) {
        //     throw new Error("Expected parameter managerId to be either an integer or null.");
        //   } 
    }
}

module.exports = Employee;
