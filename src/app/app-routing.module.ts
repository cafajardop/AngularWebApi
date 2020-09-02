import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/login/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages/pages-routing.module';

const app_routes: Routes = [
    {path:'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},        
    {
        path:'', 
        component: PagesComponent,
        loadChildren:() => import('./pages/pages.module').then(m =>m.PagesModule)}
        ,
    {path:'**',pathMatch:'full', redirectTo:'login'}
];
export const APP_ROUTES = RouterModule.forRoot(app_routes, {useHash:true});