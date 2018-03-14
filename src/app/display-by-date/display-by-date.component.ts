import { ReportService } from '../shared/report.service';
import { Report } from '../shared/report';
import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router/src/config';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-display-by-date',
  templateUrl: './display-by-date.component.html',
  styleUrls: ['./display-by-date.component.css']
})
export class DisplayByDateComponent implements OnInit {
  reportByDate: Report[];
  date: Date;

  order: string;
  reverse: boolean;

  constructor(
    private reposervice: ReportService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.date = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.reposervice
      .getReportByDate(this.date)
      .subscribe(report => (this.reportByDate = report));

    this.order = 'report.organization';
    this.reverse = false;
  }

  goBack(): void {
    this.location.back();
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

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
}
