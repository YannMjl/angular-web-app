import { Report } from './report';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { ChartDateData } from './chart-data-by-date';
import { ReportChartData } from './chart-data-by-org';
import { ReportsComponent } from '../reports/reports.component';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {}

  getReports(): Observable<Report[]> {
    const apiUrl = 'https://web-server-reports.herokuapp.com/report';

    return this.http.get<Report[]>(apiUrl)
               .pipe( catchError(this.handleError));
  }

  getDateInReport(): Observable<Report[]> {
    const apiUrl = 'https://web-server-reports.herokuapp.com/date';

    return this.http.get<Report[]>(apiUrl)
               .pipe(catchError(this.handleError));
  }

  getReportByNameChart(name: string): Observable<ReportChartData[]> {
    const apiUrl = 'https://web-server-reports.herokuapp.com/org';

    return this.http.get<ReportChartData[]>(`${apiUrl}/${name}`)
               .pipe(catchError(this.handleError));
  }

  getReportByName(name: string): Observable<Report[]> {
    const apiUrl = 'https://web-server-reports.herokuapp.com/name';

    return this.http.get<Report[]>(`${apiUrl}/${name}`)
      .pipe(catchError(this.handleError));
  }

  getReportByDateChart(date: Date): Observable<ChartDateData[]> {
    const apiUrl = 'https://web-server-reports.herokuapp.com/date';

    return this.http.get<CharacterData[]>(`${apiUrl}/${date}`)
      .pipe(catchError(this.handleError));
  }

  getReportByDate(date: Date): Observable<Report[]> {
    const apiUrl = 'https://web-server-reports.herokuapp.com/date';

    return this.http.get<Report[]>(`${apiUrl}/${date}`)
               .pipe(catchError(this.handleError));
  }

  deleteReportByName(name: string): Observable<Report[]> {
    const apiUrl = 'https://web-server-reports.herokuapp.com/delete-name';

    return this.http.get<Report[]>(`${apiUrl}/${name}`)
               .pipe(catchError(this.handleError));
  }

  deleteReportByDate(date: Date): Observable<Report[]> {
    const apiUrl = 'https://web-server-reports.herokuapp.com/delete-date';

    return this.http.get<Report[]>(`${apiUrl}/${date}`)
               .pipe(catchError(this.handleError));
  }

  deleteReport(): Observable<Report[]> {
    const apiUrl = 'https://web-server-reports.herokuapp.com/delete-all-record';

    return this.http.get<Report[]>(apiUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }
}
