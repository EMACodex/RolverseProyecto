import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAdmin = false;

  constructor(
    private AuthService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.AuthService.isAdmin();
  }

  isLoggedIn(): boolean {
    return this.AuthService.isAuth();
  }

  logout(): void {
    this.AuthService.logout();
    this.router.navigate(['/']);
  }

  isSessionRoute(): boolean {
    const path = window.location.pathname;
    return path.includes('/login') || path.includes('/register');
  }
}
