
import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Navbar } from './components/shared/navbar/navbar';
import { Footer } from './components/shared/footer/footer';

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
