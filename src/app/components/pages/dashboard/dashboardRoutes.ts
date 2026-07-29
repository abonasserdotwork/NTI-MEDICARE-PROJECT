import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";


export const dashboardRoutes: Routes = [
    { path: "", component: DashboardComponent },
    { path: 'medicines', loadComponent: () => import("./components/medicine-list/medicine-list").then((m) => m.MedicineListComponent) },
    { path: 'create-medicine', loadComponent: () => import("./components/create-medicine/create-medicine").then((c) => c.CreateMedicine) },
    { path: 'categories', loadComponent: () => import("./components/categories/categories").then((c) => c.CategoriesComponent) },
    { path: 'history', loadComponent: () => import("./components/history/history").then((c) => c.HistoryComponent) },
    { path: 'profile', loadComponent: () => import("./components/profile/profile.component").then((p) => p.ProfileComponent) },
];