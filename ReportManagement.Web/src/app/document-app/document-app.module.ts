
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { NgxSpinnerModule,NgxSpinnerService } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { ReportModule } from '../report/report.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgaReadMoreModule } from "nga-read-more";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from '../shared/shared.module';
import { DocumentAppRoutingModule } from './document-app-routing.module';
import { DocumentAppComponent } from './document-app/document-app.component';
import { DocumentAppLandingComponent } from './document-app-landing/document-app-landing.component';
import { RestRequestAppComponent } from './rest-request/rest-request-app/rest-request-app.component';



@NgModule({
  declarations: [DocumentAppLandingComponent, DocumentAppComponent, RestRequestAppComponent],
  imports: [
    CommonModule,
    ReportModule,
    RouterModule,
    DocumentAppRoutingModule,
    TranslateModule,
    NgxPaginationModule,
    NgaReadMoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CKEditorModule,
    SharedModule ,
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgxSpinnerService],
})
export class DocumentAppModule { }
