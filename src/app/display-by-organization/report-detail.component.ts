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
  reportByNames: Report[];

  ReportChart: ReportChartData[] = [];
  ReportChartData: ReportChartData[] = [];

  // chart specs
  id = 'chart1';
  width = 800;
  height = 600;
  type = 'column2d';
  dataFormat = 'json';
  dataSource;
  title = 'Angular4 FusionCharts Sample';

  constructor(
    private http: HttpClient,
    private location: Location,
    private route: ActivatedRoute,
    private reportService: ReportService
  ) {
    this.orgName = route.snapshot.params['id'];
  }

  ngOnInit() {
    this.reportService.getReportByName(this.orgName)
        .subscribe(report => {
          this.reverse = false;
          this.reportByNames = report;
        });


    this.reportService
        .getReportByNameChart(this.orgName)
        .subscribe(report => {
          this.ReportChart = report;
          console.log(this.ReportChart);

          this.dataSource = {
            // tslint:disable-next-line:quotemark
            "chart": {
              // tslint:disable-next-line:quotemark
              "caption": "Report Chart",
              // tslint:disable-next-line:quotemark
              "subCaption": "Memory Space Used",
              // tslint:disable-next-line:quotemark
              // "numberprefix": "$",
              // tslint:disable-next-line:quotemark
              "theme": "fint"
            },
            'data': this.ReportChart.map(item => {
              return { 'label': item.size, 'value': item.date };
            })
            /*
            'data': [
              {
                'label': 'Bakersfield Central',
                'value': '880000'
              },
              {
                'label': 'Garden Groove harbour',
                'value': '730000'
              },
              {
                'label': 'Los Angeles Topanga',
                'value': '590000'
              },
              {
                'label': 'Compton-Rancho Dom',
                'value': '520000'
              },
              {
                'label': 'Daly City Serramonte',
                'value': '330000'
              }
            ]*/
          };



          /*this.reportByNames.map(item => {
           return {'label': item.size, 'value': item.date};
          });*/
          console.log(this.dataSource);
        });

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
