import { ReportService } from '../report.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { IMyDpOptions } from 'mydatepicker';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Report } from '../report';

// define the constant url we would be uploading to
const apiUrl = 'http://localhost:5000/file';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: apiUrl });

  public myform: FormGroup;
  loading = false;

  // set report variable
  reportBydate: Report[];
  public reportDate: Date;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    height: '40px',
    width: '210px',
    inline: false
  };

  public model: any = {date: { year: 2018, month: 1, day: 1 }};

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private http: HttpClient,
    private FB: FormBuilder,
    private el: ElementRef,
    private repoService: ReportService
  ) {}

  ngOnInit() {

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log('ImageUpload:uploaded:', item, status, response);
    };

    this.getReportByDate(this.reportDate);

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

  getReportByDate(date: Date): void {
    console.log('get report after upload');
    this.repoService.getReportByDate(date)
    .subscribe(report => this.reportBydate = report);
  }
}
