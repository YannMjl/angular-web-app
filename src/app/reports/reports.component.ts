import { Popup } from 'ng2-opd-popup';
import { Router } from '@angular/router';
import { Report } from '../shared/report';
import { Component, OnInit } from '@angular/core';
import { ReportChartData } from '../shared/chart-data-by-org';
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
  reportsByName: Report[];
  reportsByDate: Report[];

  constructor(
    private popup: Popup,
    private router: Router,
    private reportService: ReportService
  ) {}

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
    this.popup.options = {
      header: 'Delete all reports',
      color: '#b30000',
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: 'Delete', // The text on your confirm button
      cancleBtnContent: 'Cancel', // the text on your cancel button
      animation: 'fadeInDown' // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };

    this.popup.show(this.popup.options);

  }

  ConfirmDeleteEvent() {

    this.reportService
      .deleteReport()
      .subscribe(report => (this.reports = report));

    this.router.navigate(['/upload-file']);
  }

  CancelDeleteEvent() {
    this.popup.hide();
  }

}
