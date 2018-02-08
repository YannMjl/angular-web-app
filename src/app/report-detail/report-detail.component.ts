import { ReportsComponent  } from './../reports/reports.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Report } from '../report';
import { ReportService } from '../report.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import { HttpClient } from '@angular/common/http';

// define the constant url we would be uploading to
const deleteUrl = 'https://web-server-reports.herokuapp.com/delete-name/';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
  reportByNames: Report[];
  orgName: string;

  order: string;
  reverse: boolean;

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) {
    this.orgName = route.snapshot.params['id'];
  }

  ngOnInit() {
    this.reportService
        .getReportByName(this.orgName)
        .subscribe(report => (this.reportByNames = report));

    this.order = 'report.organization';
    this.reverse = false;
  }

  goBack(): void {
    this.location.back();
  }

  deleteReport() {
    if (confirm('Are you sure you want to delete this record?')) {

      console.log('delete report');

      this.reportService.deleteReportByName(this.orgName)
          .subscribe(report => (this.reportByNames = report));

      this.location.back();

    }
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
}
