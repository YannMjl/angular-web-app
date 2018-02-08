import { ReportsComponent } from './reports/reports.component';
import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Report } from './report';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {}

  getReports(): Observable<Report[]> {
    const apiUrl = 'https://web-server-reports.herokuapp.com/report';

    return this.http.get<Report[]>(apiUrl);
  }

  getDateInReport(): Observable<Report[]> {
    const apiUrl = 'https://web-server-reports.herokuapp.com/date';

    return this.http.get<Report[]>(apiUrl);
  }

  getReportByName(name: string): Observable<Report[]> {
    const apiUrl = 'https://web-server-reports.herokuapp.com/name/' + name;

    return this.http.get<Report[]>(apiUrl);
  }

  getReportByDate(date: Date): Observable<Report[]> {
    const apiUrl = 'https://web-server-reports.herokuapp.com/date/' + date;

    return this.http.get<Report[]>(apiUrl);
  }

  deleteReport(): Observable<Report[]> {
    const apiUrl = 'https://web-server-reports.herokuapp.com/delete-all-record';

    return this.http.get<Report[]>(apiUrl);
  }

  deleteReportByName(name: string): Observable<Report[]> {
    const apiUrl =
      'https://web-server-reports.herokuapp.com/delete-name/' + name;

    return this.http.get<Report[]>(apiUrl);
  }

  deleteReportByDate(date: Date): Observable<Report[]> {
    const apiUrl =
      'https://web-server-reports.herokuapp.com/delete-date/' + date;

    return this.http.get<Report[]>(apiUrl);
  }
}
