import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Report } from './report';
import { REPORT20Dec } from './mock-report';

import { HttpClient } from '@angular/common/http';



@Injectable()
export class ReportService {

  constructor(private http: HttpClient) {  }

  getReports(): Observable<Report[]> {

    const apiUrl = 'http://localhost:3000';

    return this.http.get<Report[]>(apiUrl);
  }

  getMockReports(): Observable<Report[]> {
    return of (REPORT20Dec);
  }

}
