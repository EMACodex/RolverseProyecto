import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private AuthService: AuthService
  ) { }

  isLoggedIn(): boolean {
    return this.AuthService.isAuth();
  }

  logout(): void {
    this.AuthService.logout();
  }

  isSessionRoute(): boolean {
    return window.location.pathname.includes('/login') || window.location.pathname.includes('/register');
  }
}
