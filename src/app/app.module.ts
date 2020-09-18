import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/login/register.component';
import { HttpClientModule } from '@angular/common/http';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { APP_ROUTES } from './app-routing.module';
import { ModalUploadComponent } from './components/modal-upload/modal-upload.component';
import { PipesModule } from './pipes/pipes.module';
import { ServiceModule } from './services/service.module';
import { LoadingComponent } from './components/loading/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
    ModalUploadComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    PipesModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }