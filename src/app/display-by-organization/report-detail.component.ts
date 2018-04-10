import { Popup } from 'ng2-opd-popup';
import { Router } from '@angular/router';
import { Report } from '../shared/report';
import { HttpClient } from '@angular/common/http';
import { Location, DatePipe } from '@angular/common';
import { ReportService } from '../shared/report.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ReportChartData } from '../shared/chart-data-by-org';
import { ReportsComponent } from '../reports/reports.component';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild  } from '@angular/core';

@Component({
  providers: [DatePipe],
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {

  order: string;
  reverse: boolean;
  orgName: string;
  reportByNames: Report[];
  ReportByNamesChart: ReportChartData[] = [];

  // chart specs
  dataSource;
  width = '1000';
  height = 500;
  id = 'chart1';
  type = 'column2d';
  dataFormat = 'json';

  @ViewChild('popupViewByOrg') popupOrg: Popup;

  constructor(
    private popup: Popup,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe,
    private location: Location,
    private route: ActivatedRoute,
    private reportService: ReportService
  ) {
    this.orgName = route.snapshot.params['id'];
  }

  ngOnInit() {
    this.reportService.getReportByName(this.orgName)
        .subscribe(report => {
          this.reportByNames = report;
          this.reverse = false;
          console.log('init reverse' + this.reverse);
        });

    this.order = '-size';

    this.reportService
        .getReportByNameChart(this.orgName)
        .subscribe(report => {
          this.ReportByNamesChart = report;

          this.dataSource = {

            'chart': {
              'showAlternateHGridColor': '1',
              // Background color and alpha
              'bgColor': '#ebf6f9',
              'bgAlpha': '50',
              'theme': 'fint',
              'canvasPadding': '15',
              // data value config
              'showValues': '0',
              // data labels config
              'slantLabel': '1',
              'labelFont': 'Arial',
              'labelFontBold': '1',
              'lableFontItalic': '1',
              'labelFontAlpha': '70',
              'labelDisplay': 'rotate',
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
              'plotGradientColor': '#ffffff',
              // number format
              'numberScaleUnit': ' KB, MB, GB',
              'numberScaleValue': '1024,1024,1024'
            },
            'data': this.ReportByNamesChart.map(item => {
              return {
                'label': this.datePipe.transform(item.date, 'MMMM d, y'),
                'value': item.size,
                // generate new color for each data display
                'color': '#336699' + Math.floor(Math.random() * 16777215).toString(16)
                };
            })
          };

          console.log(this.dataSource);

        });
  }

  goBack(): void {
    this.location.back();
  }

  onSelect(event) {
    console.log(event);
  }

  setOrder(value: string) {
    if (value !== null && this.order === value) {
      this.reverse = !this.reverse;
      if (this.reverse === true) {
        value = '-' + value;
      }
    }
    this.order = value;

    console.log('in setOrder' + this.reverse);

    console.log('in setOrder ' + this.order);
  }

  deleteReport() {
    this.popupOrg.options = {
      header: 'Delete Report',
      color: '#b30000',
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: 'Delete', // The text on your confirm button
      cancleBtnContent: 'Cancel', // the text on your cancel button
      animation: 'fadeInUp' // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };

    this.popupOrg.show(this.popupOrg.options);

  }

  ConfirmDeleteEvent() {

    this.reportService.deleteReportByName(this.orgName)
        .subscribe(report => (this.reportByNames = report));

    this.router.navigate(['/report']);
  }

  CancelDeleteEvent() {
    this.popupOrg.hide();
  }

}
