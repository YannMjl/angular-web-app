import { Component, OnInit } from '@angular/core';
import { Report } from '../report';
import { REPORT20Dec } from '../mock-report';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  /*get the report vector from the mock-report file and set its val */
  reportsM = REPORT20Dec;

  /* set variable selectedReport to class Report from report.ts file */
  selectedReport: Report;

  reports: Report[];
  reportsMock: Report[];

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    console.log('in');
    this.getReports();
    this.getMockReports();
  }

  onSelect(report: Report): void {
    this.selectedReport = report;
  }

  getReports(): void {
    console.log('in report');
    this.reportService.getReports()
    .subscribe(reports => this.reports = reports);
  }

  getMockReports(): void {
    this.reportService.getMockReports()
      .subscribe(reportsMock => this.reportsMock = reportsMock);
  }

}
