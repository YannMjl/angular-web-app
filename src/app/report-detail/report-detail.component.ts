import { ReportsComponent } from './../reports/reports.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Report } from '../report';
import { ReportService } from '../report.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {

  @Input() selectedname: string;

  reportByNames: Report[];

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    /*
    this.route.params
      .switchMap((params: Params) =>
        this.reportService.getReportByName(params['organization'])
      )
      .subscribe(report => (this.reports = report)); */

    this.getReportByName(this.selectedname);
  }

  getReportByName(organization: string): void {
    console.log('in report');
    organization = this.selectedname;
    this.reportService
      .getReportByName(organization)
      .subscribe(reports => (this.reportByNames = reports));
  }

  goBack(): void {
    this.location.back();
  }
}
