import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Employee } from '../types';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = {
    _id: "",
    first_name: "",
    last_name: "",
    email: "",
    salary: 0,
    gender: ""
  };

  // Define form properties for employee update
  public first_name: string = "";
  public last_name: string = "";
  public email: string = "";
  public salary: number = 0;
  public gender: string = "";

  loading = false;
  newEmp: Employee | undefined;
  employeeID!: string | null;

  testUser: boolean | null;

  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router) {
    this.testUser = window.localStorage.getItem('email') === "test@mail.com" || window.localStorage.getItem('username') === "testUser";
  }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    this.loading = true;
    this.employeeID = this.route.snapshot.paramMap.get('employeeID');

    if (this.employeeID) {
      this.apollo.query<any>({
        query:
          gql`
            query getEmployeeByID($$employeeId: String!) {
              getEmployeeByID(_id: $employeeId) {
                employeeId
                first_name
                last_name
                email
                gender
                salary
              }
            } 
          `,
        variables: {
          _id: this.employeeID
        }
      })
        .subscribe(({ data, loading }) => {
          console.log("data: ", data.getEmployeeByID);
          if (data.getEmployeeByID) {
            this.employee = data.getEmployeeByID;
            this.first_name = this.employee.first_name;
            this.last_name = this.employee.last_name;
            this.email = this.employee.email;
            this.salary = this.employee.salary;
            this.gender = this.employee.gender
          }
          this.loading = loading;
        })
    }
  }

  onSubmit(): void {
    this.employeeID = this.route.snapshot.paramMap.get('employeeID');

    // Adding or updating an employee depending on the presence of employeeID url parameter
    if (this.employeeID) {
      this.apollo.mutate<any>({
        mutation: gql`
          mutation updateEmployee($_id: String!, $first_name: String!, $last_name: String!, $email: String!, $gender: String!, $salary: Float!) {
            updateEmployee(_id: $_id, first_name: $first_name,last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
              _id
              first_name
              last_name
              email
              gender
              salary
            }
          }
        `,
        variables: {
          _id: this.employeeID,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          gender: this.gender,
          salary: this.salary
        }
      })
        .subscribe(({ data, loading }) => {
          console.log("Employee updated: ", data.updateEmployee);
          this.employee = data.updateEmployee;
          this.loading = loading;
          this.router.navigate(['/']);
        })
    }
    else {
      this.apollo.mutate<any>({
        mutation: gql`
          mutation addEmployee($first_name: String!, $last_name: String!, $email: String!, $gender: String!, $salary: Float!) {
            addEmployee(first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary){
              first_name
              last_name
              email
              gender
              salary
            }
          }
        `,
        variables: {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          gender: this.gender,
          salary: this.salary
        }
      })
        .subscribe(({ data, loading }) => {
          console.log("Employee added: ", data.addEmployee);
          this.employee = data.addEmployee;
          this.loading = loading;
          window.location.href = "/";
        })
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}