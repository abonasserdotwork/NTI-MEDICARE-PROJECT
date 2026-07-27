import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { ServicesComponent } from './components/pages/services-component/services-component';
import { ContactComponent } from './components/pages/contact/contact';
import { LoginComponent } from './components/auth/login/login';
import { Register } from './components/auth/register/register';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: Home },
    { path: "services", component: ServicesComponent },
    { path: "contact-us", component: ContactComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: Register },
];
