class Department {
    constructor(deptId, name) {
        this.deptId = deptId;
        this.name = name;

        // if (typeof deptId !== "number") {
        //     throw new Error("Expected parameter 'deptId' to be an integer.");
        //   }
        // if (typeof name !== "string" || !name.trim().length) {
        // throw new Error("Expected parameter 'name' to be a non-empty string");
        // } 
    }
}

module.exports = Department;
