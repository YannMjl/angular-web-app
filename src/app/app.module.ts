import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportService } from './report.service';
import { HttpClientModule } from '@angular/common/http';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { RoutingModule } from './routing.module';
import { FileSizePipe } from './file-size.pipe';
import { DisplayByDateComponent } from './display-by-date/display-by-date.component';

import { OrderModule } from 'ngx-order-pipe';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MyDatePickerModule } from 'mydatepicker';

// import the ng2-file-upload directive so we can add it to our declaration
import { FileSelectDirective } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent,
    ReportDetailComponent,
    FileSizePipe,
    DisplayByDateComponent,
    FileUploadComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    OrderModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
  ],
  providers: [ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
