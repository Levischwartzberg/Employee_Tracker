const Role = require("./Role.js");

class Department extends Role {
    constructor(deptId, name) {
        super(deptId);
        this.name = name;

        if (typeof deptId !== "number") {
            throw new Error("Expected parameter 'deptId' to be an integer.");
          }
        if (typeof name !== "string" || !name.trim().length) {
        throw new Error("Expected parameter 'name' to be a non-empty string");
        } 
    }
}

module.exports = Department;
