import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {Routes,RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AuthService } from './core/auth.service';
import { CrudService } from './core/crud.service';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MurliComponent } from './pages/murli/murli.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommentaryComponent } from './pages/commentary/commentary.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { TeachersComponent } from './pages/teachers/teachers.component';

@NgModule({
  imports:      [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule, 
    ],
  declarations: [ AppComponent, LoginComponent, DashboardComponent, MurliComponent, NavbarComponent, CommentaryComponent, CoursesComponent, ClassesComponent, CategoriesComponent, TeachersComponent ],
  bootstrap:    [ AppComponent ],
  providers: [AuthService, CrudService]
})
export class AppModule { }
