import { ReportDetailComponent } from './display-by-organization/report-detail.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
// import { PopupModule } from 'ng2-opd-popup';

import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './reports/reports.component';
import { DisplayByDateComponent } from './display-by-date/display-by-date.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';

const routes: Routes = [
  { path: '', component: ReportsComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'report', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'upload-file', component: FileUploadComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: ReportDetailComponent, data: [{ isProd: true }], canActivate: [AuthGuard] },
  { path: 'detail-date/:id', component: DisplayByDateComponent, data: [{ isProd: true }], canActivate: [AuthGuard] },

  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // PopupModule.forRoot(),
  ],
  exports: [RouterModule]
})

export class RoutingModule {}
