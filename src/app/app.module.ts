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


@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent,
    ReportDetailComponent,
    FileSizePipe,
    DisplayByDateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    OrderModule
  ],
  providers: [ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
