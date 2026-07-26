import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResetPassword } from './reset-password/reset-password';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ResetPassword],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-medicare-app');
}
