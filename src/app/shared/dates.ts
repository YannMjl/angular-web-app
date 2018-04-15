// dates to be highlighted on the calender
export class DatesInReport {
    year: number;
    month: number;
    day: number;

    constructor(year: number, month: number, day: number) {
        this.day = day;
        this.month = month;
        this.year = year;
    }
}
