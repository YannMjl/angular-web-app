import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http';
import { Report } from '../shared/report';
import { IMyDpOptions } from 'mydatepicker';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { ReportService } from '../shared/report.service';
import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// define the constant url we would be uploading to
const apiUrl = 'https://web-server-reports.herokuapp.com/file';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  loading = false;
  reportBydate: Report[];
  public reportDate: Date;
  public myform: FormGroup;

  public myDatePickerOptions: IMyDpOptions = {
    inline: false,
    height: '40px',
    width: '210px',
    dateFormat: 'yyyy-mm-dd'
  };

  public model: any = {date: { year: 2018, month: 1, day: 1 }};

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private el: ElementRef,
    private FB: FormBuilder,
    private http: HttpClient,
    private repoService: ReportService
  ) {}

  ngOnInit() {

    this.getReportByDate(this.reportDate);

  }

  getReportByDate(date: Date): void {
    console.log('get report after upload');
    this.repoService.getReportByDate(date)
      .subscribe(report => this.reportBydate = report);
  }

  upload() {

    // tslint:disable-next-line:prefer-const
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
      '#photo'
    );

    const fileCount: number = inputEl.files.length;

    const formData = new FormData();

    this.reportDate = this.model.jsdate.toISOString();

    if (fileCount > 0) {

      formData.append('file', inputEl.files.item(0));
      formData.append('date', this.model.jsdate.toISOString());

      this.http
          .post(apiUrl, formData)
          .map((res: Response) => res.json())
          .subscribe(
            success => {
              alert('file uploaded succeful');
            },

            error => alert(error)
          );
    }

  }

}
