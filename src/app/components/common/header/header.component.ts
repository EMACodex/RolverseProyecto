import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {

  isAdmin = false;
  mobileMenuOpen = false;
  
  constructor(
    private AuthService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.AuthService.getCurrentUser();

    if (user) {
      if (Array.isArray((user as any).roles)) {
        this.isAdmin = (user as any).roles.includes('admin');
      }
      else if (typeof (user as any).role === 'string') {
        this.isAdmin = (user as any).role === 'admin';
      }
    }

  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
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
