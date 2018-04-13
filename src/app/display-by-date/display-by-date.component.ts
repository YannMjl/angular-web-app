import { Popup } from 'ng2-opd-popup';
import { Router } from '@angular/router';
import { Report } from '../shared/report';
import { Location } from '@angular/common';
import { Data } from '@angular/router/src/config';
import { OrderByPipe } from '../shared/order-by.pipe';
import { ReportService } from '../shared/report.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ChartDateData } from '../shared/chart-data-by-date';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  providers: [OrderByPipe],
  selector: 'app-display-by-date',
  templateUrl: './display-by-date.component.html',
  styleUrls: ['./display-by-date.component.css']
})
export class DisplayByDateComponent implements OnInit {

  date: Date;
  order: string;
  reverse: boolean;
  reportByDate: Report[];
  reportByDateChart: ChartDateData[] = [];

  // fusionchart specs
  dataSource;
  width = 1000;
  height = 500;
  id = 'chart1';
  type = 'scrollColumn2d';
  dataFormat = 'json';

  @ViewChild('popupViewByDate') popupByDate: Popup;

  constructor(
    private popup: Popup,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private orderByPipe: OrderByPipe,
    private reposervice: ReportService
  ) {
    this.date = this.route.snapshot.params['id'];
  }

  ngOnInit() {

    this.reposervice
        .getReportByDate(this.date)
        .subscribe(report => {
          this.reportByDate = report;
          this.order = '-size';
          this.reverse = false;
        }
      );

    this.reposervice
        .getReportByDateChart(this.date)
        .subscribe(report => {

          // sort organization in the report by Ascending order
          this.reportByDateChart = this.orderByPipe.transform(report, 'organization');

          // check array content for order by result
          console.log(this.reportByDateChart);

          this.dataSource = {
            'chart': {
              /*
              'paletteColors': '#0075c2',
              // 'bgColor': '#ebf6f9',
              'showBorder': '0',
              'showCanvasBorder': '0',
              'plotBorderAlpha': '10',
              'usePlotGradientColor': '0',
              'plotFillAlpha': '50',
              'showXAxisLine': '1',
              'axisLineAlpha': '25',
              'divLineAlpha': '10',
              // 'showValues': '1',
              // 'showAlternateHGridColor': '0',
              'captionFontSize': '14',
              'subcaptionFontSize': '14',
              'subcaptionFontBold': '0',
              'toolTipColor': '#ebf6f9',
              'toolTipBorderThickness': '0',
              'toolTipBgColor': '#000000',
              'toolTipBgAlpha': '80',
              'toolTipBorderRadius': '2',
              'toolTipPadding': '5',


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
              // 'usePlotGradientColor': '1',
              // 'plotGradientColor': '#ffffff',
              */
              // number format
              'numberScaleUnit': ' KB, MB, GB',
              'numberScaleValue': '1024,1024,1024',

              'caption': 'Sales Trends',
              'subcaption': '2017 - 2018',
              'xaxisname': 'Month',
              'yaxisname': 'Revenue',
              'showvalues': '1',
              'placeValuesInside': '1',
              'rotateValues': '1',
              'valueFontColor': '#ffffff',
              'baseFontColor': '#333333',
              'baseFont': 'Helvetica Neue,Arial',
              'captionFontSize': '14',
              'subcaptionFontSize': '14',
              'subcaptionFontBold': '0',
              'showborder': '0',
              'paletteColors': '#0075c2',
              'bgcolor': '#FFFFFF',
              'showalternatehgridcolor': '0',
              'showplotborder': '0',
              'labeldisplay': 'WRAP',
              'divlinecolor': '#CCCCCC',
              'showcanvasborder': '0',
              'linethickness': '3',
              'plotfillalpha': '100',
              'plotgradientcolor': '',
              'numVisiblePlot': '12',
              'divlineAlpha': '100',
              'divlineColor': '#999999',
              'divlineThickness': '1',
              'divLineIsDashed': '1',
              'divLineDashLen': '1',
              'divLineGapLen': '1',
              'scrollheight': '10',
              'flatScrollBars': '1',
              'scrollShowButtons': '0',
              'scrollColor': '#cccccc',
              'showHoverEffect': '1'

            },

            'categories': [
              {
                'category': this.reportByDateChart.map(item => {
                  return {
                    'label': item.organization
                  };
                })
              }],
              'dataset': [
                {
                  'data':
                    this.reportByDateChart.map(item => {
                      return {
                        'value': item.size,
                        'color': '#336699' + Math.floor(Math.random() * 16777215).toString(16)
                      };
                    })

                }]
          };
          console.log(this.dataSource);
        });
    this.order = 'report.organization';
  }

  goBack(): void {
    this.location.back();
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
      if (this.reverse === true) {
        value = '-' + value;
      }
    }
    this.order = value;

    console.log('in setOrder, reverse value: ' + this.reverse);

    console.log('in setOrder, order by: ' + this.order);
  }

  deleteReport() {
    this.popupByDate.options = {
      header: 'Delete Report',
      color: '#b30000',
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: 'Delete', // The text on your confirm button
      cancleBtnContent: 'Cancel', // the text on your cancel button
      animation: 'fadeInUp' // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };

    this.popupByDate.show(this.popupByDate.options);

  }

  ConfirmDeleteEvent() {

    this.reposervice
        .deleteReportByDate(this.date)
        .subscribe(report => (this.reportByDate = report));

    this.router.navigate(['/report']);
  }

  CancelDeleteEvent() {
    this.popupByDate.hide();
  }

}
