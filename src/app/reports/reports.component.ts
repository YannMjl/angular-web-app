import { Report } from '../shared/report';
import { Component, OnInit } from '@angular/core';
import { ReportChartData } from '../shared/report-chart-data';
import { ReportService } from '../shared/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reports: Report[];
  reportDate: Report[];
  selecteddate: Report;
  selectedreport: Report;
  reportsByName: ReportChartData[];
  reportsByDate: Report[];

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    console.log('initialize get report');
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

  getDateInReport(): void {
    console.log('get dates of reports');
    this.reportService
      .getDateInReport()
      .subscribe(reports => {
        this.reportDate = reports;
      });
  }

  getReports(): void {
    console.log('get name of organization in the report');
    this.reportService
      .getReports()
      .subscribe(reports => {
        this.reports = reports;
      });
  }

  getreportByName(name: string): void {
    console.log('get report by org name');
    this.reportService
      .getReportByName(name)
      .subscribe(reports => (this.reportsByName = reports));
  }

  getreportBydate(date: Date): void {
    console.log('get report by date');
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
