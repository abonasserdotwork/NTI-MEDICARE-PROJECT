import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: Home },
    { path: "services", loadComponent: () => import("./components/pages/services-component/services-component").then((c) => c.ServicesComponent) },
    { path: "contact-us", loadComponent: () => import("./components/pages/contact/contact").then((c) => c.ContactComponent) },
    { path: "auth", loadComponent: () => import("./components/auth/auth.component").then((c) => c.AuthComponent), loadChildren: () => import("./components/auth/authRoutes").then((m) => m.authRoutes) },
    { path: 'medicines', loadComponent: () => import("./components/pages/medicine-list/medicine-list").then((m) => m.MedicineListComponent) },
    { path: 'create-medicine', loadComponent: () => import("./components/pages/create-medicine/create-medicine").then((c) => c.CreateMedicine) },
    
];
