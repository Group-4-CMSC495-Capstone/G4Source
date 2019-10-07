import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {UserService} from "../_services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit {
    currentUser: any;
    users = [];

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        //this.currentUser = this.authenticationService.currentUserValue;
    }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

    ngOnInit() {

        this.authenticationService.currentUser.subscribe(user=>this.currentUser = user);

    }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
