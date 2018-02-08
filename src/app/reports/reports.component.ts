import { Component, OnInit } from '@angular/core';
import { Report } from '../report';
import { ReportService } from '../report.service';

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

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    console.log('in');
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
      .subscribe(reports => (this.reports = reports));
  }

  getDateInReport(): void {
    this.reportService
      .getDateInReport()
      .subscribe(reports => (this.reportDate = reports));
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
