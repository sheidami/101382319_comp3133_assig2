export type Employee = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  salary: number;
}

export type User = {
  email: string;
  username: string;
  password: string;
}

export type Query = {
  getEmployees: Employee[];
  getEmployeeByID(_id: string): Employee;
  login(email_username: string, password: string): User;
}

export type Mutation = {
  addEmployee(first_name: string, last_name: string, email: string, gender: string, salary: number): Employee;
  updateEmployee(_id: string, first_name: string, last_name: string, email: string, gender: string, salary: number): Employee;
  deleteEmployee(_id: string):  Boolean;
  signup(username: string, email: string, password: string): User;
}