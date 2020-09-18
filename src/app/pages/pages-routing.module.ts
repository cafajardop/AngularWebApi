import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuarios/usuario.component';
import { NgModule } from '@angular/core';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsuariosNuevosComponent } from './usuarios-nuevos/usuarios-nuevos.component';
import { ProfileComponent } from './profile/profile.component';
import { CardsusersComponent } from './usuarios-nuevos/cardsusers.component';
import { CursoComponent } from './cursos/curso.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursoNuevoComponent } from './cursos/curso-nuevo.component';
import { CardscoursesComponent } from './cursos/cardscourses.component';
import { ViewcoursesComponent } from './cursos/viewcourses/viewcourses.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriasComponent } from './categoria/categorias.component';
import { CategoriaNuevaComponent } from './categoria/categoria-nueva/categoria-nueva.component';
import { CardsCategoriaComponent } from './categoria/cards-categoria/cards-categoria.component';
import { CardsviewcoursesComponent } from './cursos/viewcourses/cardsviewcourses.component';
import { SubcategoriasComponent } from './subcategorias/subcategorias.component';
import { SubcategoriaComponent } from './subcategorias/subcategoria.component';
import { SubcategoriaNuevaComponent } from './subcategorias/subcategoria-nueva/subcategoria-nueva.component';
import { CardsSubcategoriaComponent } from './categoria/cards-categoria/cards-subcategoria.component';

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
    {path:'cardsviewCourses/:id', component: CardsviewcoursesComponent},
    {path:'categoria/:id', component:CategoriaComponent},
    {path:'categorias', component:CategoriasComponent},
    {path:'categoriaNuevo/:id', component:CategoriaNuevaComponent},
    {path:'cardsCategorias', component: CardsCategoriaComponent},
    {path:'cardsSubCategorias/:id', component: CardsSubcategoriaComponent},
    {path:'subcategorias', component:SubcategoriasComponent},
    {path:'subcategoria/:id', component:SubcategoriaComponent},
    {path:'subcategoriaNuevo/:id', component:SubcategoriaNuevaComponent},
    {path:'', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
    imports: [ RouterModule.forChild(pagesRoutes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
