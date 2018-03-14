import { Report } from '../shared/report';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReportService } from '../shared/report.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ReportsComponent } from '../reports/reports.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {

  order: string;
  orgName: string;
  reverse: boolean;
  reportByNames: Report[];

  constructor(
    private http: HttpClient,
    private location: Location,
    private route: ActivatedRoute,
    private reportService: ReportService
  ) {
    this.orgName = route.snapshot.params['id'];
  }

  ngOnInit() {
    this.reportService
        .getReportByName(this.orgName)
        .subscribe(report => {
          this.reverse = false;
          this.reportByNames = report;
        }
      );

    this.order = 'report.organization';
  }

  goBack(): void {
    this.location.back();
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  deleteReport() {
    if (confirm('Are you sure you want to delete this record?')) {

      console.log('delete report');

      this.reportService.deleteReportByName(this.orgName)
          .subscribe(report => (this.reportByNames = report));

      this.location.back();

    }
  }

}
