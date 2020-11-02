import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { User } from 'src/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page-for-doko',
  templateUrl: './landing-page-for-doko.component.html',
  styleUrls: ['./landing-page-for-doko.component.css']
})
export class LandingPageForDokoComponent implements OnInit {

  userDataSubscription: any;
  userData = new User();

  constructor(private authService: AuthenticationService,
    private route: Router) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
  }

  ngOnInit() {

    if(this.userData.isLoggedIn ===false) {
      this.route.navigate(['/login']);
    }
  }

}
