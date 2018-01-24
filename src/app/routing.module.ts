import { ReportDetailComponent } from './report-detail/report-detail.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports/reports.component';
import { DisplayByDateComponent } from './display-by-date/display-by-date.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
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
