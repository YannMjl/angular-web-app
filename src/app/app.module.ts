import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportService } from './report.service';
import { HttpClientModule } from '@angular/common/http';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { RoutingModule } from './routing.module';
import { FileSizePipe } from './file-size.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent,
    ReportDetailComponent,
    FileSizePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
