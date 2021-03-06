import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReportService } from "src/services/report.services";
import { CommonService } from "src/services/common.services";
import { HttpClient } from "@angular/common/http";
import { isUndefined } from 'util';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from "ngx-bootstrap/chronos";
import { jaLocale } from "ngx-bootstrap/locale";
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/services/user.service';
defineLocale("ja", jaLocale);

@Component({
  selector: "app-report-previledged-view",
  templateUrl: "./report-previledged-view.component.html",
  styleUrls: ["./report-previledged-view.component.css"]
})
export class ReportPreviledgedViewComponent implements OnInit {
  reportSearchForm: FormGroup;
  reportList: any[] = [];
  employeeId: string;
  createdDate: string;
  selectedOption: any;
  userList:  any[] = [];

  maxDate : Date;

  pageNumber: number;
  bsValue = new Date();

  constructor(
    private route: Router,
    private reportService: ReportService,
    private userService: UserService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private bsLocaleService: BsLocaleService,
    //Spinner effect implemented. spinner will work while data is being loaded from server
    // resource: https://www.c-sharpcorner.com/article/how-to-add-loaderspinner-in-angular-8-application/
    private SpinnerService: NgxSpinnerService
  ) {
    this.bsLocaleService.use('ja');

    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
    //console.log(this.maxDate);

    
    this.getRecentReports();
    console.log(this.reportList);
    this.getAllUsers();

  }

  ngOnInit() {
    console.log(this.reportList);
    console.log(this.userList);
    this.reportSearchForm = this.formBuilder.group({
      employeeNameSelectedValue: [''],
      dateSelectedValue: ['']
    });
    this.reportSearchForm.controls.dateSelectedValue.setValue(this.bsValue);
  }

  get f(){
    return this.reportSearchForm.controls;
  }

  getRecentReports() {
    //before fetching data, spinner effect shows
    this.SpinnerService.show();
    this.reportService.getRecentReports().subscribe(
      data => {
        Object.entries(data).map(res => {
          this.reportList.push(res[1]);
        });
        //after fetching data, spinner will hide
        this.SpinnerService.hide();
      },
      err => {}
    );
  }

  preventType(event): boolean {
    return false;
  }

  preventBackspace(event): boolean {
    return false;
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        Object.entries(data).map(res => {
          this.userList.push(res[1]);
        });
      },
      err => {}
    );
  }

  onClickSearch() {
      this.employeeId = this.reportSearchForm.controls['employeeNameSelectedValue'].value;
      let tempDate = this.reportSearchForm.controls['dateSelectedValue'].value;
      this.createdDate = this.datePipe.transform(tempDate, 'yyyy-MM-dd');
      // console.log(this.employeeId);
      // console.log(this.createdDate);
      if(isUndefined(this.employeeId)) {this.employeeId = ''};
      if((this.employeeId === '' && this.createdDate !== '') || isUndefined(this.employeeId)) {
        this.route.navigate(["/report/show/search"], { queryParams: { createdDate: this.createdDate }});
        console.log(this.createdDate);
      }
      if(this.employeeId !== '' && this.createdDate === '') {
        this.route.navigate(["/report/show/search"], { queryParams: { employeeId: this.employeeId }});
        console.log(this.employeeId);
      }
      if(this.employeeId !== '' && this.createdDate !== '') {
        this.route.navigate(["/report/show/search"], { queryParams: { employeeId: this.employeeId, createdDate: this.createdDate }});
        console.log(this.employeeId);
        console.log(this.createdDate);
      }
      if((this.employeeId === '' && this.createdDate === '') || isUndefined(this.employeeId)) { console.log("putki mara kha!")};
      //this.route.navigate(["/search-report"], { queryParams: { employeeId: this.employeeId, createdDate: this.createdDate }});

  }


  // onSelect(event: TypeaheadMatch): void {
  //   this.selectedOption = event.item['userId'];
  // }
}
