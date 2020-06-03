import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MurliComponent } from './pages/murli/murli.component';
import { CommentaryComponent } from './pages/commentary/commentary.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { TeachersComponent } from './pages/teachers/teachers.component';

const appRoutes:Routes=[
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'murli', component: MurliComponent},
    {path: 'commentary', component: CommentaryComponent},
    {path: 'courses', component: CoursesComponent},
    {path: 'classes', component: ClassesComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'teachers', component: TeachersComponent},
  ]}
]



@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  exports:[RouterModule]
})
export class AppRoutingModule{ }