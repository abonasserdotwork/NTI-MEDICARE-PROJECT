import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Footer } from './components/shared/footer/footer';
import { Navbar } from './components/shared/navbar/navbar';
import { Route } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
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
