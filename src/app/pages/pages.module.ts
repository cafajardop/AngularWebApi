import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { FooterComponent } from '../components/footer/footer.component';
import { NavbarComponent } from '../components/navbar/navbar.component';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PipesModule } from '../pipes/pipes.module';
import { UsuariosNuevosComponent } from './usuarios-nuevos/usuarios-nuevos.component';
import { ProfileComponent } from './profile/profile.component';
import { CardsusersComponent } from './usuarios-nuevos/cardsusers.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursoComponent } from './cursos/curso.component';
import { CursoNuevoComponent } from './cursos/curso-nuevo.component';
import { CardscoursesComponent } from './cursos/cardscourses.component';
import { ViewcoursesComponent } from './cursos/viewcourses/viewcourses.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    UsuarioComponent,    
    FooterComponent,
    NavbarComponent,
    AccountSettingsComponent,
    UsuariosNuevosComponent,
    ProfileComponent,
    CardsusersComponent,
    CursosComponent,
    CursoComponent,
    CursoNuevoComponent,
    CardscoursesComponent,
    ViewcoursesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    SharedModule,
    PipesModule
  ],
  exports:[
    
  ]
})
export class PagesModule { }
