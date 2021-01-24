import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DocumentAppLandingComponent } from './document-app-landing/document-app-landing.component';
import { DocumentAppComponent } from './document-app/document-app.component';
import { RestRequestAppComponent } from './rest-request/rest-request-app/rest-request-app.component';


const docuAppRoutes: Routes = [
  {
    path: "document-app",
    component: DocumentAppComponent,
    children: [
      { path: "", component: DocumentAppLandingComponent },
      { path: "rest-request", component: RestRequestAppComponent },
    ]
  }
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(docuAppRoutes, { onSameUrlNavigation: 'reload' })
  ]
})
export class DocumentAppRoutingModule { }
