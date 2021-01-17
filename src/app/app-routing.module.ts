import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSchoolComponent } from './add-school/add-school.component';
import { SchoolsComponent } from './schools/schools.component';

const routes: Routes = [
  {
    path: 'schools',
    component: SchoolsComponent
  },
  {
    path: 'new',
    component: AddSchoolComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
