import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  email: string | null;
  username: string | null;

  constructor(private auth: AuthService) {
    this.email = auth.email
    this.username = auth.username
  }

  logout(): void {
    this.auth.logout();
  }
}
