import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/login/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const app_routes: Routes = [
    {path:'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},    
    {path:'dashboard', component: DashboardComponent},
    {path:'**',pathMatch:'full', redirectTo:'login'}
]

@NgModule({
    imports:[
        RouterModule.forRoot(app_routes, { useHash:true })
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{}