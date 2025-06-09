import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { notAuthGuard } from './guards/not-auth.guard';
import { SendMailComponent } from './components/auth/recover-password/send-mail/send-mail.component';
import { ResetPassComponent } from './components/auth/recover-password/reset-pass/reset-pass.component';
import { PersonalComponent } from './components/profile/personal/personal.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
    {
    path: 'login',
    component: LoginComponent,
    canActivate: [notAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [notAuthGuard]
  },
  {
    path: 'sendRecover',
    component: SendMailComponent,
    canActivate: [notAuthGuard]
  },
  {
    path: 'recover/:token',
    component: ResetPassComponent,
    canActivate: [notAuthGuard]
  },
  {
    path: 'profile',
    component: PersonalComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
