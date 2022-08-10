import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyemailComponent } from './components/verifyemail/verifyemail.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome)

  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'verify-email',
    component: VerifyemailComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    ...canActivate(redirectToHome)
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
