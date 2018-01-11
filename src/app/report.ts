export class Report {
  organization: string;
  size: number;
  date: Date;

  constructor( name: string, size: number, date: Date) {
    this.organization = name;
    this.size = size;
    this.date = date;
  }
}
