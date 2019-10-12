import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {first, map} from "rxjs/operators";
import {AlertService} from "../_services/alert.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthenticationService} from "../_services/authentication.service";

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

    changeAccount;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private alertService: AlertService, private http: HttpClient, private auth: AuthenticationService) {

        this.changeAccount = this.formBuilder.group({

            email: ['', Validators.email],
            password: ['']

        });

    }

    ngOnInit() {
    }

    get f() {
        return this.changeAccount.controls;
    }

    onSubmit(formData) {

        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.changeAccount.invalid) {
            return;
        }

        console.log(this.changeAccount.value);

        this.http.put(environment.apiUrl + "/users/" + this.auth.currentUserValue.user_id, formData, {responseType: 'text'}).subscribe((result) => {

          console.log(result);
          this.alertService.success(result);

        });


        /*this.userService.register(this.changeAccount.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.alertService.success('Registration successful', true);
                  this.router.navigate(['/login'], { queryParams: { registered: true }});
                },
                error => {
                  this.alertService.error(error);
                  this.loading = false;
                });

    */
    }

}
