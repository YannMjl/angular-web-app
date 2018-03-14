import { Report } from './shared/report';
import { Component, OnInit } from '@angular/core';
import { ReportService } from './shared/report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CloudRepo - CSV Files reports';
  reports: Report[];
  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reportService
      .getReports()
      .subscribe(reports => {
        this.reports = reports;
      });
  }
}
