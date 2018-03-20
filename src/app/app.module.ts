// import services and pipe
import { FileSizePipe } from './shared/file-size.pipe';
import { ReportService } from './shared/report.service';

// import modules
import { NgModule } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';
import { RoutingModule } from './routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';

// import app components
import { AppComponent } from './app.component';
import { ReportsComponent } from './reports/reports.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DisplayByDateComponent } from './display-by-date/display-by-date.component';
import { ReportDetailComponent } from './display-by-organization/report-detail.component';

@NgModule({
  declarations: [
    FileSizePipe,
    AppComponent,
    ReportsComponent,
    FileUploadComponent,
    ReportDetailComponent,
    DisplayByDateComponent
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
    MyDatePickerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ReportService,
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
