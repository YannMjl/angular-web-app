import { Report } from '../shared/report';
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../shared/report.service';
import { LoaderService } from '../shared/loader.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  selectedreport: Report;
  selecteddate: Report;

  reports: Report[];
  reportDate: Report[];
  reportsByName: Report[];
  reportsByDate: Report[];

  constructor(private reportService: ReportService,
              private loaderService: LoaderService) {}

  ngOnInit() {
    console.log('in');
    this.loaderService.display(true); // loader on
    this.getReports();
    this.getDateInReport();
  }

  onSelect(report: Report, name: string): void {
    this.selectedreport = report;
    name = this.selectedreport.organization;
  }

  onSelectDate(report: Report, date: Date): void {
    this.selecteddate = report;
    date = this.selecteddate.date;
  }

  getReports(): void {
    console.log('in report');
    this.reportService
      .getReports()
      .subscribe(reports => {
        this.reports = reports;
        this.loaderService.display(false);
      });
  }

  getDateInReport(): void {
    this.reportService
      .getDateInReport()
      .subscribe(reports => {
        this.reportDate = reports;
        this.loaderService.display(false);
      });
  }

  getreportByName(name: string): void {
    console.log('in report name');
    this.reportService
      .getReportByName(name)
      .subscribe(reports => (this.reportsByName = reports));
  }

  getreportBydate(date: Date): void {
    console.log('in report date');
    this.reportService
      .getReportByDate(date)
      .subscribe(reports => (this.reportsByDate = reports));
  }

  deleteAllReport() {
    if (confirm('Are you sure you want to delete this record?')) {
      console.log('delete report');

      this.reportService
          .deleteReport()
          .subscribe(report => (this.reports = report));
    }
  }
}
