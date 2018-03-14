import { Report } from '../shared/report';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router/src/config';
import { ReportService } from '../shared/report.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-display-by-date',
  templateUrl: './display-by-date.component.html',
  styleUrls: ['./display-by-date.component.css']
})
export class DisplayByDateComponent implements OnInit {

  date: Date;
  order: string;
  reverse: boolean;
  reportByDate: Report[];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private reposervice: ReportService
  ) {
    this.date = this.route.snapshot.params['id'];
  }

  ngOnInit() {

    this.reposervice
        .getReportByDate(this.date)
        .subscribe(report => {
          this.reverse = false;
          this.reportByDate = report;
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

      this.reposervice
          .deleteReportByDate(this.date)
          .subscribe(report => (this.reportByDate = report));

      this.location.back();
    }
  }

}
