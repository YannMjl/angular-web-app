export class Report {
  organization: string;
  size: number;
  date: Date;

  constructor( organization: string, size: number, date: Date) {
    this.organization = organization;
    this.size = size;
    this.date = date;
  }
}
