import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { User } from '../types';
import * as myGlobals from '../globals';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = {
    email: "",
    username: "",
    password: ""
  }


  // Define form fields variables
  public email: string = ""
  public username: string = ""
  public password: string = ""

  public message: string = ""
  public loading: boolean = false

  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router) { }

  handleSignUp(): void {
    this.apollo.mutate<any>({
      mutation: gql`
          mutation signup($email: String!, $username: String!, $password: String!) {
            signup(email: $email, username: $username, password: $password) {
              email
              username
              password
            }
          }
        `,
      variables: {
        email: this.email,
        username: this.username,
        password: this.password
      },
      errorPolicy: 'all'
    })
      .subscribe(({ data, loading }) => {
        console.log("User signed up: ", data.updateEmployee);
        this.user = data.signup;
        this.loading = loading;
        localStorage.setItem("token", myGlobals.token);
        this.message = "success";

        setTimeout(() => {
          window.location.href = "/";
        }, 2000)
      },
        (error) => {
          this.message = "error";
          this.loading = false;

          setTimeout(() => {
            this.message = "";
          }, 3000)
        }
      )
  }


}
