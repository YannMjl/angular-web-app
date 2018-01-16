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
    const apiUrl = 'http://localhost:5000';

    return this.http.get<Report[]>(apiUrl);
  }

  getDateInReport(): Observable<Report[]> {
    const apiUrl = 'http://localhost:5000/date';

    return this.http.get<Report[]>(apiUrl);
  }

  getReportByName(name: string): Observable<Report[]> {
    const apiUrl = 'http://localhost:5000/' + name;

    return this.http.get<Report[]>(apiUrl);
  }

  getReportByDate(date: Date): Observable<Report[]> {
    const apiUrl = 'http://localhost:5000/date/' + date;

    return this.http.get<Report[]>(apiUrl);
  }
}
