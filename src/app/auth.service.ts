import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email: string | null = localStorage.getItem('email')
  username: string | null = localStorage.getItem('username')
  id: string = ""
  userID = localStorage.getItem('currentUserID');

  constructor(private apollo: Apollo) { }

  logout(): void {
    localStorage.removeItem('currentUserID');
    localStorage.removeItem('token');
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('username')
    this.email = "";
    this.username = "";
    this.id = "";
    window.location.href = "/";
  }
}
