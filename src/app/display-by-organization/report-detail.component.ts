import { Report } from '../shared/report';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReportService } from '../shared/report.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ReportChartData } from '../shared/chart-data-by-org';
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
  width = 600;
  height = 400;
  type = 'column2d';
  dataFormat = 'json';
  dataSource;

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

            'chart': {
              'theme': 'fint',
              // data value config
              'valueFontBold': '1',
              'rotateValues': '0',
              // data labels config
              'slantLabel': '1',
              'labelFont': 'Arial',
              'labelFontBold': '1',
              'lableFontItalic': '1',
              'labelFontAlpha': '70',
              'labelDisplay': 'rotate',
              // number format
              'numberScaleValue': '1024,1024,1024',
              'numberScaleUnit': ' KB, MB, GB',
              // y Axis name config
              'yAxisNameFont': 'Arial',
              'yAxisNameFontBold': '1',
              'yAxisNameFontSize': '15',
              'yAxisNameFontItalic': '1',
              'yAxisNameFontColor': '#993300',
              'yAxisName': 'Size (memory used)',
              // x Axis config
              'xAxisName': 'Date',
              'xAxisNameFont': 'Arial',
              'xAxisNameFontBold': '1',
              'xAxisNameFontSize': '15',
              'xAxisNameFontItalic': '1',
              'xAxisNameFontColor': '#993300',
              // add gradient effect to data plots
              'usePlotGradientColor': '1',
              'plotGradientColor': '#ffffff'
            },
            'data': this.ReportChart.map(item => {
              return {
                'label': item.date,
                'value': item.size,
                // generate new color for each data display
                'color': '#336699' + Math.floor(Math.random() * 16777215).toString(16)
                };
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
