import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuarios/usuario.component';
import { NgModule } from '@angular/core';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsuariosNuevosComponent } from './usuarios-nuevos/usuarios-nuevos.component';
import { ProfileComponent } from './profile/profile.component';
import { CardsusersComponent } from './usuarios-nuevos/cardsusers.component';
import { CursoComponent } from './cursos/curso.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursoNuevoComponent } from './cursos/curso-nuevo.component';
import { CardscoursesComponent } from './cursos/cardscourses.component';
import { ViewcoursesComponent } from './cursos/viewcourses/viewcourses.component';

const pagesRoutes : Routes = [
    {path:'usuarios', component: UsuariosComponent},
    {path:'usuario/:id', component: UsuarioComponent},
    {path:'cursos', component:CursosComponent},
    {path:'curso/:id', component: CursoComponent},
    {path:'cursoNuevo/:id', component: CursoNuevoComponent},
    {path:'usuarioNuevo/:id', component: UsuariosNuevosComponent},
    {path:'profile', component: ProfileComponent},
    {path:'account-settings', component: AccountSettingsComponent},
    {path:'cardsUsers', component: CardsusersComponent},
    {path:'cardsCourses', component: CardscoursesComponent},
    {path:'viewCourses/:id', component: ViewcoursesComponent},    
    {path:'', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
    imports: [ RouterModule.forChild(pagesRoutes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}