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
    const apiUrl = 'https://clojure-web-server.herokuapp.com/report';

    return this.http.get<Report[]>(apiUrl);
  }

  getDateInReport(): Observable<Report[]> {
    const apiUrl = 'https://clojure-web-server.herokuapp.com/date';

    return this.http.get<Report[]>(apiUrl);
  }

  getReportByName(name: string): Observable<Report[]> {
    const apiUrl = 'https://clojure-web-server.herokuapp.com/' + name;

    return this.http.get<Report[]>(apiUrl);
  }

  getReportByDate(date: Date): Observable<Report[]> {
    const apiUrl = 'https://clojure-web-server.herokuapp.com/date/' + date;

    return this.http.get<Report[]>(apiUrl);
  }
}
