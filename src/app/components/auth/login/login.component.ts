import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill out all fields correctly.';
      return;
    }

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res) => {
        if (res.code !== 200 || !res.token) {
          this.errorMessage = res.message || 'Login failed.';
          return;
        }
        localStorage.setItem('token', res.token);
        this.router.navigate(['/register']);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password.';
      }
    });
  }
}
