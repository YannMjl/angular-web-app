import { Report } from './report';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import { Injectable, Inject } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { ChartDateData } from './chart-data-by-date';
import { ReportChartData } from './chart-data-by-org';
import { environment } from '../../environments/environment';
import { ReportsComponent } from '../reports/reports.component';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ReportService {

  private readonly getReportEndpoint: string;
  private readonly deleteAllReportEndpoint: string;
  private readonly getReportByNameEndpoint: string;
  private readonly getDateInReportEndpoint: string;
  private readonly getReportByDateEndpoint: string;
  private readonly getChartDataByOrgEndpoint: string;
  private readonly getChartDataByDateEndpoint: string;
  private readonly deleteReportByNameEndpoint: string;
  private readonly deleteReportByDateEndpoint: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    const endpoint = environment.apiUrl;
    this.getReportEndpoint = endpoint + '/report';
    this.getReportByDateEndpoint = endpoint + '/date';
    this.getDateInReportEndpoint = endpoint + '/date';
    this.getReportByNameEndpoint = endpoint + '/name';
    this.getChartDataByOrgEndpoint = endpoint + '/org';
    this.getChartDataByDateEndpoint = endpoint + '/date-chart';
    this.deleteReportByNameEndpoint = endpoint + '/delete-name';
    this.deleteReportByDateEndpoint = endpoint + '/delete-date';
    this.deleteAllReportEndpoint = endpoint + '/delete-all-record';
  }

  // add authorization header with token
  authHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token' + this.authService.loginToken
    })
  };

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.getReportEndpoint)
                    .pipe( catchError(this.handleError));
  }

  deleteReport(): Observable<Report[]> {
    return this.http.get<Report[]>(this.deleteAllReportEndpoint)
      .pipe(catchError(this.handleError));
  }

  getDateInReport(): Observable<Report[]> {
    return this.http.get<Report[]>(this.getDateInReportEndpoint)
                    .pipe(catchError(this.handleError));
  }

  getReportByName(name: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.getReportByNameEndpoint}/${name}`)
                    .pipe(catchError(this.handleError));
  }

  getReportByDate(date: Date): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.getReportByDateEndpoint}/${date}`)
                    .pipe(catchError(this.handleError));
  }

  deleteReportByName(name: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.deleteReportByNameEndpoint}/${name}`)
                    .pipe(catchError(this.handleError));
  }

  deleteReportByDate(date: Date): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.deleteReportByDateEndpoint}/${date}`)
                    .pipe(catchError(this.handleError));
  }

  getReportByDateChart(date: Date): Observable<ChartDateData[]> {
    return this.http.get<CharacterData[]>(`${this.getChartDataByDateEndpoint}/${date}`)
                    .pipe(catchError(this.handleError));
  }

  getReportByNameChart(name: string): Observable<ReportChartData[]> {
    return this.http.get<ReportChartData[]>(`${this.getChartDataByOrgEndpoint}/${name}`)
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
