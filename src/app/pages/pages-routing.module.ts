import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuarios/usuario.component';
import { NgModule } from '@angular/core';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsuariosNuevosComponent } from './usuarios-nuevos/usuarios-nuevos.component';

const pagesRoutes : Routes = [
    {path:'usuarios', component: UsuariosComponent},
    {path:'usuario/:id', component: UsuarioComponent},
    {path:'usuarioNuevo/:id', component: UsuariosNuevosComponent},
    /* {path:'dashboard', component: DashboardComponent}, */
    {path:'account-settings', component: AccountSettingsComponent},
    /* {path:'', redirectTo: '/dashboard', pathMatch: 'full'} */
];

@NgModule({
    imports: [ RouterModule.forChild(pagesRoutes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}