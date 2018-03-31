import { ReportDetailComponent } from './display-by-organization/report-detail.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './reports/reports.component';
import { DisplayByDateComponent } from './display-by-date/display-by-date.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  { path: '', redirectTo: 'root', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'detail/:id', component: ReportDetailComponent, data : [{ isProd: true }]},
  { path: 'detail-date/:id', component: DisplayByDateComponent, data : [{ isProd: true }]},
  { path: 'report', component: ReportsComponent },
  { path: 'upload-file', component: FileUploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule {}
