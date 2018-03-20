import { Report } from '../shared/report';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReportService } from '../shared/report.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ReportChartData } from '../shared/report-chart-data';
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
  reportByNames: ReportChartData[];
  ReportChart: ReportChartData[] = [];

  single: any[];

  view: any[] = [700, 400];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Dates';
  showYAxisLabel = true;
  yAxisLabel = 'Size';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private http: HttpClient,
    private location: Location,
    private route: ActivatedRoute,
    private reportService: ReportService
  ) {
    this.orgName = route.snapshot.params['id'];

    Object.assign(this, this.single);
  }

  ngOnInit() {
    this.reportService
        .getReportByName(this.orgName)
        .subscribe(report => {
          this.reverse = false;
          this.reportByNames = report;
          this.ReportChart = report;
        }
      );

    this.reportService.getReportByName(this.orgName)
      .subscribe(data => data.forEach((item, i, reportByNames) => {
        this.single.push({
          size: (item.size), date: (item.date)
        });
      }
      ));
    this.single.map(data => console.log(data));

    this.order = 'report.organization';
  }

  goBack(): void {
    this.location.back();
  }

  onSelect(event) {
    console.log(event);
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
