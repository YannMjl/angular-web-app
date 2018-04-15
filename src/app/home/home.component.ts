import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { Report } from '../shared/report';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReportService } from '../shared/report.service';
import { DatePipe } from '@angular/common';

import { DatesInReport } from '../shared/dates';

@Component({
  providers: [DatePipe],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  report: Report[] = [];
  public reportDate: Date;
  public myform: FormGroup;
  datesInReport: DatesInReport[] = [];
  date: Date;
  myDates;

  day: number;
  month: number;
  year: number;

  public myDatePickerOptions: IMyDpOptions;

  public model: any = { date: { year: 2018, month: 1, day: 1 } };

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private reportService: ReportService,
  ) { }

  ngOnInit() {
    console.log('in home report');

    this.reportService.getDateInReport()
      .subscribe(reports => {
        this.report = reports;
        this.myDates =  this.report.map(item => {
          this.date = new Date(item.date);
          this.day = this.date.getDate();
          this.month = this.date.getMonth() + 1;
          this.year = this.date.getUTCFullYear();
          // console.log('the date is: ' + this.date);
          // console.log('day in date ' + this.day);
          // console.log('Month in date ' + this.month);
          // console.log('year in date ' + this.year);
          return {
            'day': this.day,
            'month': this.month,
            'year': this.year
          };
        });

      });

    // set the pick up dates on the calender
    this.myDatePickerOptions = {
      inline: false,
      height: '40px',
      width: '250px',
      selectionTxtFontSize: '14px',
      dateFormat: 'd mmm yyyy',

      markDates: [
        {
          dates: [ this.report.map(item => {
            this.date = new Date(item.date);
            this.day = this.date.getDate();
            this.month = this.date.getMonth() + 1;
            this.year = this.date.getUTCFullYear();
            return { year: this.year, month: this.month, day: this.day  };
          })], color: 'red'

        }],

      highlightDates: [{ year: 2018, month: 1, day: 3 }, { year: 2018, month: 1, day: 24 }],

      selectorHeight: '300px',
      selectorWidth: '400px',
    };

    console.log('my date picker options are: ' + this.myDatePickerOptions.markDates);

  }

  viewReport() {

    if (this.model !== null) {
      this.reportDate = this.model.jsdate.toISOString();
      this.router.navigate(['/detail-date', this.reportDate]);
    }
  }

}
