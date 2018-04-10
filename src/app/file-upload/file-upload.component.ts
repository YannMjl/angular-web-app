import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Popup } from 'ng2-opd-popup';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Report } from '../shared/report';
import { IMyDpOptions } from 'mydatepicker';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { ReportService } from '../shared/report.service';
import { environment } from '../../environments/environment';
import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  reportBydate: Report[];
  public reportDate: Date;
  public myform: FormGroup;
  private readonly uploadEndpoint: string;

  public myDatePickerOptions: IMyDpOptions = {
    inline: false,
    height: '40px',
    width: '210px',
    dateFormat: 'yyyy-mm-dd'
  };

  public model: any = { date: { year: 2018, month: 1, day: 1 } };

  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('myFileInput') myFile: any;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private router: Router,
    private el: ElementRef,
    private FB: FormBuilder,
    private http: HttpClient,
    private repoService: ReportService
  ) {
    // set uploading endpoint
    const endpoint = environment.apiUrl;
    this.uploadEndpoint = endpoint + '/file';
  }

  ngOnInit() { this.getReportByDate(this.reportDate); }

  getReportByDate(date: Date): void {
    console.log('get report after upload');
    this.repoService.getReportByDate(date)
                    .subscribe(report => {
                      this.reportBydate = report;
                    });
  }

  upload() {

    if (this.model !== null && this.myFile.nativeElement.value !== '') {

      // tslint:disable-next-line:prefer-const
      let inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
        '#photo'
      );

      const fileCount: number = inputEl.files.length;

      const formData = new FormData();

      this.reportDate = this.model.jsdate.toISOString();

      if (fileCount > 0) {

        this.popup2.options = {
          color: '#2a4d6f',
          showButtons: true,
          animationDuration: 1,
          header: 'File Uploaded',
          cancleBtnContent: 'close',
          confirmBtnContent: 'View Uploaded Report',
          animation: 'fadeInUp' // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
        };

        this.popup1.options = {
          color: '#2a4d6f',
          showButtons: true,
          animationDuration: 1,
          header: 'Error',
          cancleBtnContent: 'Go Back to report',
          confirmBtnContent: 'Try Agin',
          animation: 'fadeInUp' // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
        };

        formData.append('file', inputEl.files.item(0));
        formData.append('date', this.model.jsdate.toISOString());

        this.http.post(this.uploadEndpoint, formData)
                 .subscribe(
                   success => { this.popup2.show(this.popup2.options); },
                   error => { alert(error); }
                 );
      }
    } else {
      // this.popup1.show(this.popup1.options);
      alert('No date or file was selected! You must select date and file to upload');
    }

  }

  CloseEvent() { this.popup1.hide(); }

  GoBackEvent() {
    this.popup1.hide();
    this.router.navigate(['/report']);
  }

  CloseUploadEvent() {
    this.model = null;
    this.myFile.nativeElement.value = '';
    this.popup2.hide();
  }

  ViewUploadEvent() {
    this.popup2.hide();
    this.router.navigate(['/detail-date', this.reportDate]);
  }

}
