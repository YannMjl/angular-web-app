// import modules
import { NgModule } from '@angular/core';
import { BrowserXhr } from '@angular/http';
import { OrderModule } from 'ngx-order-pipe';
import { RoutingModule } from './routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';

// import app components
import { AppComponent } from './app.component';
import { ReportsComponent } from './reports/reports.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { DisplayByDateComponent } from './display-by-date/display-by-date.component';

// import services and pipe
import { FileSizePipe } from './shared/file-size.pipe';
import { ReportService } from './shared/report.service';
import { LoaderService } from './shared/loader.service';

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
    NgProgressModule,
    HttpClientModule,
    FileUploadModule,
    MyDatePickerModule,
    ReactiveFormsModule
  ],
  providers: [
    ReportService,
    LoaderService,
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
