import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResetPassword } from './reset-password/reset-password';
import { Register } from './register/register';
import { LoginComponent } from './login/login';
import { ContactComponent } from './contact/contact';
import { ServicesComponent } from './services-component/services-component';
import { Home } from './home/home';
import { NavbarComponent } from './navbar/navbar';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ResetPassword, Register, LoginComponent, 
    ContactComponent, ServicesComponent, Home, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-medicare-app');
}
