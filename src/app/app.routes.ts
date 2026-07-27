import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { ServicesComponent } from './components/pages/services-component/services-component';
import { ContactComponent } from './components/pages/contact/contact';
import { AuthComponent } from './components/auth/auth.component';
import { authRoutes } from './components/auth/authRoutes';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: Home },
    { path: "services", component: ServicesComponent },
    { path: "contact-us", component: ContactComponent },
    { path: "auth", component: AuthComponent, children: authRoutes },
];
