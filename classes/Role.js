class Role {
    constructor(roleId, title, salary, deptId) {
        this.roleId = roleId;
        this.title = title;
        this.salary = salary;
        this.deptId = deptId;

        // if (typeof roleId !== "number") {
        //     throw new Error("Expected parameter 'roleId' to be an integer.");
        //   }
        // if (typeof title !== "string" || !title.trim().length) {
        // throw new Error("Expected parameter 'title' to be a non-empty string");
        // } 
        // if (typeof salary !== "number" || salary !== undefined) {
        //     throw new Error("Expected parameter 'salary' to be either a number or null.");
        //   } 
        // if (typeof deptId !== "number") {
        // throw new Error("Expected parameter 'deptId' to be an integer.");
        // }
    }
}

module.exports = Role;

