import { Component, OnInit } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
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
  formSubmitAttempt: boolean;

  day: number;
  month: number;
  year: number;

  public myDatePickerOptions: IMyDpOptions;

  // private model: string = null;   // not initial date set (use null or empty string)
  private model: any = {jsdate: new Date()};   // initialize today with jsdate property
  // private model: Object = {formatted: '24.09.2018'};   // this example is initialized to specific dat
  // private model: Object = {date: {year: 2018, month: 10, day: 9}};   // this example is initialized to specific date

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private reportService: ReportService,
  ) { }

  ngOnInit() {
    console.log('in home report');

    this.myform = this.fb.group({
      // myDate: [null, Validators.required]   // not initial date set
      myDate: [{jsdate: new Date()}, Validators.required] // initialize today with jsdate property
      // myDate: [{ date: { year: 2018, month: 10, day: 9 } }, Validators.required]   // this example is initialized to specific date
    });

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
                          markDates: this.myDates,
                          dateFormat: 'd mmm yyyy',
                          selectionTxtFontSize: '14px',
                          /*
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
                            }),*/
                        };

                      });
  }
  isFieldInvalid(field: string) {
    return (
      (!this.myform.get(field).valid && this.myform.get(field).touched) ||
      (this.myform.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onDateChanged(event: IMyDateModel) {
    console.log('onDateChanged(): ', event.date,
                ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(),
                ' - formatted: ', event.formatted,
                ' - epoc timestamp: ', event.epoc);
  }

  viewReport() {

    if (this.model !== null) {
      // get date from form
      this.reportDate = this.model.jsdate.toISOString();
      // get report by date from report service
      this.reportService.getReportByDate(this.reportDate);
      // view report by calling its route and passing the date
      this.router.navigate(['/detail-date', this.reportDate]);
    }
    this.formSubmitAttempt = true;
  }

}
