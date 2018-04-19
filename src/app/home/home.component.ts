import { Component, OnInit } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { Report } from '../shared/report';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReportService } from '../shared/report.service';
import { DatePipe } from '@angular/common';
import { OrderByPipe } from '../shared/order-by.pipe';

import { DatesInReport } from '../shared/dates';

@Component({
  providers: [DatePipe, OrderByPipe],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ListOfOrganizationInReport: Report[];

  report: Report[] = [];
  public reportDate: Date;
  public myform: FormGroup;
  datesInReport: DatesInReport[] = [];
  date: Date;
  myDates;
  order: string;
  reverse: boolean;

  selectedreport: Report;
  reportsByName: Report[];

  day: number;
  month: number;
  year: number;

  public myDatePickerOptions: IMyDpOptions;

  private model: any = null;   // not initial date set (use null or empty string)
  // private model: any = {jsdate: new Date()};   // initialize today with jsdate property
  // private model: any = {formatted: '24.09.2018'};   // this example is initialized to specific dat
  // private model: any = {date: {year: 2018, month: 10, day: 9}};   // this example is initialized to specific date

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private orderByPipe: OrderByPipe,
    private reportService: ReportService,
  ) { }

  ngOnInit() {
    console.log('in home report');
    // init get dates in report
    this.getDatesInReport();
    // init get list of organizations
    this.getListOfOrganization();

    this.myform = this.fb.group({
      // myDate: [null, Validators.required]   // not initial date set
      myDate: [{jsdate: new Date()}, Validators.required] // initialize today with jsdate property
      // myDate: [{ date: { year: 2018, month: 10, day: 9 } }, Validators.required]   // this example is initialized to specific date
    });

  }
  onSelect(report: Report, name: string): void {
    this.selectedreport = report;
    name = this.selectedreport.organization;
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
    console.log('in setOrder, order by : ' + this.order);
  }

  getListOfOrganization(): void {
    console.log('get list of organization in report');
    this.reportService.getReports()
                      .subscribe(data => {
                        // sort organization in the report by Ascending order
                        this.ListOfOrganizationInReport = this.orderByPipe.transform(data, 'organization');
                      });
  }

  viewReport() {
    // get date from form
    this.reportDate = this.model.jsdate.toISOString();

    // view report by calling its route and passing the date
    this.router.navigate(['/detail-date', this.reportDate]);
  }

  onDateChanged(event: IMyDateModel) {
    console.log('onDateChanged(): ', event.date,
      ' - formatted: ', event.formatted,
      ' - epoc timestamp: ', event.epoc,
      ' - jsdate: ', new Date(event.jsdate).toLocaleDateString());
  }

  getreportByName(name: string): void {
    console.log('get report by org name');
    this.reportService
      .getReportByName(name)
      .subscribe(reports => (this.reportsByName = reports));
  }

  getDatesInReport(): void {

    this.reportService.getDateInReport()
      .subscribe(reports => {
        this.report = reports;

        // get day, month, and year from dates in report
        this.myDates = [
          {
            dates: this.report.map(item => {
              this.date = new Date(item.date);
              this.day = this.date.getDate();
              this.month = this.date.getMonth() + 1;
              this.year = this.date.getUTCFullYear();
              console.log('the date is: ' + this.date);
              console.log('day in date ' + this.day);
              console.log('Month in date ' + this.month);
              console.log('year in date ' + this.year);
              return { year: this.year, month: this.month, day: this.day };
            }), color: '#cc0000'

          }
        ];

        // calender specs
        this.myDatePickerOptions = {
          inline: false,
          width: '250px',
          height: '40px',
          sunHighlight: false,
          selectorWidth: '400px',
          selectorHeight: '300px',
          // markDates: this.myDates,
          dateFormat: 'd mmm yyyy',
          selectionTxtFontSize: '14px',

          highlightDates:
            this.report.map(item => {
              this.date = new Date(item.date);
              this.day = this.date.getDate();
              this.month = this.date.getMonth() + 1;
              this.year = this.date.getUTCFullYear();
              console.log('the date is: ' + this.date);
              console.log('day in date ' + this.day);
              console.log('Month in date ' + this.month);
              console.log('year in date ' + this.year);
              return { year: this.year, month: this.month, day: this.day };
            }),
        };

      });

  }

}
