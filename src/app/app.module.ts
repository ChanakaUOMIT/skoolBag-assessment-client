import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchoolsComponent } from './schools/schools.component';
import { AddSchoolComponent } from './add-school/add-school.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SchoolComponent } from './school/school.component';
import { DeleteSchoolComponent } from './delete-school/delete-school.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolsHeaderComponent } from './schools-header/schools-header.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    SchoolsComponent,
    AddSchoolComponent,
    SchoolComponent,
    DeleteSchoolComponent,
    SchoolListComponent,
    SchoolsHeaderComponent,
    AppNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    // DataTablesModule,
    // NgxDatatableModule
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
