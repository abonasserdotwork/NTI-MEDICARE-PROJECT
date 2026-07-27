
import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ResetPassword } from './components/auth/components/reset-password/reset-password';
import { Register } from './components/auth/components/register/register';
import { LoginComponent } from './components/auth/components/login/login';
import { ContactComponent } from './components/pages/contact/contact';
import { CategoriesComponent } from './categories/categories';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ResetPassword, Register,LoginComponent,ContactComponent,CategoriesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-medicare-app');
  private route = inject(Router);


  //  Checks if the path equals to
  // /login or /register to hide nav and footer Component

  isLogin = '/auth/login';
  isRegister = '/auth/register';
  isReset = '/auth/reset-password';

  get getRoute() {
    return this.route.url;
  }
}
