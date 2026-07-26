import { Routes } from '@angular/router';
import { ResetPassword } from './reset-password/reset-password';

export const routes: Routes = [
    { path: "", redirectTo: "reset-password", pathMatch: "full" },
    { path: "reset-password", component: ResetPassword }
];
