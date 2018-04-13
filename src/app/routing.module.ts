import { AuthGuard } from './auth/auth.guard';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './reports/reports.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DisplayByDateComponent } from './display-by-date/display-by-date.component';
import { ReportDetailComponent } from './display-by-organization/report-detail.component';

const routes: Routes = [
  { path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ReportsComponent},
      { path: 'home', component: HomeComponent },
      { path: 'report', component: ReportsComponent },
      { path: 'upload-file', component: FileUploadComponent },
      { path: 'detail/:id', component: ReportDetailComponent, data: [{ isProd: true }] },
      { path: 'detail-date/:id', component: DisplayByDateComponent, data: [{ isProd: true }] },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class RoutingModule {}
