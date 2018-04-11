import './shared/rxjs-operators';

// import services and pipes
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { OrderByPipe } from './shared/order-by.pipe';
import { FileSizePipe } from './shared/file-size.pipe';
import { ReportService } from './shared/report.service';

// import modules
import { NgModule } from '@angular/core';
import { PopupModule } from 'ng2-opd-popup';
import { OrderModule } from 'ngx-order-pipe';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import {
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule} from '@angular/material';

// import app components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ReportsComponent } from './reports/reports.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DisplayByDateComponent } from './display-by-date/display-by-date.component';
import { ReportDetailComponent } from './display-by-organization/report-detail.component';

// chart module and others
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import { FusionChartsModule } from 'angular4-fusioncharts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

import { TokenInterceptor } from './auth/auth.interceptor';

@NgModule({
  imports: [CommonModule],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AppMaterialModule { }

@NgModule({
  declarations: [
    OrderByPipe,
    FileSizePipe,
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ReportsComponent,
    HomeLayoutComponent,
    FileUploadComponent,
    LoginLayoutComponent,
    ReportDetailComponent,
    DisplayByDateComponent,

  ],

  imports: [
    OrderModule,
    FormsModule,
    BrowserModule,
    RoutingModule,
    NgxChartsModule,
    NgProgressModule,
    HttpClientModule,
    FileUploadModule,
    AppMaterialModule,
    MyDatePickerModule,
    FusionChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PopupModule.forRoot()
  ],

  providers: [
    ReportService,
    AuthService,
    AuthGuard,
    { // when any request is made, the progress bar will track its loading process automatically.
      provide: HTTP_INTERCEPTORS,
      useClass: NgProgressInterceptor,
      multi: true
    },
    /*
    { // when any request is made, the token will be present automatically in the headers.
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
