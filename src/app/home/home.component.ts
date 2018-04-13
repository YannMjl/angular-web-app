import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    inline: false,
    height: '40px',
    width: '210px',
    dateFormat: 'yyyy-mm-dd',
    markDates: [
      { dates:
        [ { year: 2018, month: 4, day: 14 },
          { year: 2018, month: 4, day: 16 }
        ], color: 'red' },
      { dates:
        [ { year: 2018, month: 4, day: 1 },
          { year: 2018, month: 4, day: 4 }], color: '#0000ff' }],

    highlightDates: [{ year: 2018, month: 11, day: 3 }, { year: 2018, month: 1, day: 24 }],

    // selectorHeight:
  };

  public model: any = { date: { year: 2018, month: 1, day: 1 } };

  constructor() { }

  ngOnInit() {
  }



}
