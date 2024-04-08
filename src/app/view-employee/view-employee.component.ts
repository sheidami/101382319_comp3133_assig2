import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Employee } from '../types';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employee: Employee = {
    _id: "",
    first_name: "",
    last_name: "",
    email: "",
    salary: 0,
    gender: ""
  };

  loading = false;
  employeeID!: string | null;


  constructor(private route: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit(): void {
    this.viewEmployee();
  }

  viewEmployee(): void {
    this.loading = true;
    this.employeeID = this.route.snapshot.paramMap.get('employeeID');

    if (this.employeeID) {
      this.apollo.query<any>({
        query:
          gql`
            query getEmployeeByID($_id: String!) {
              getEmployeeByID(_id: $_id) {
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
          _id: this.employeeID
        }
      })
        .subscribe(({ data, loading }) => {
          console.log("data: ", data.getEmployeeByID);
          if (data.getEmployeeByID) {
            this.employee = data.getEmployeeByID;
          }
          this.loading = loading;
        })
    }
  }
}
