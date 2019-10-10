import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {products} from "../products";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {UserService} from "../_services/user.service";
import {AuthenticationService} from "../_services/authentication.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AlertService} from "../_services/alert.service";


const httpOptions = {
    headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'my-auth-token',
            'Accept': 'application/json',
        }
    )
};

@Component({
    selector: 'app-add-reminder',
    templateUrl: './add-reminder.component.html',
    styleUrls: ['./add-reminder.component.css']
})
export class AddReminderComponent implements OnInit {

    addReminderForm;
    minDate = new Date();
    dummyDate;

    constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private auth: AuthenticationService, private alertService: AlertService) {

        this.addReminderForm = this.formBuilder.group({

            name: '',
            description: '',
            date: ['', Validators.required],
            hour: '',
            min: '',
            meridian: '',
            notify_date: ''

        });

    }

    ngOnInit() {

    }

    counter(i: number) {
        return new Array(i);
    }

    onSubmit(formdata) {

        this.dummyDate = new Date(formdata.date);
        formdata.notify_date = formdata.date;//this.dummyDate.getMonth()+"/"+this.dummyDate.getDate()+"/"+this.dummyDate.getYear()+" "+formdata.hour+":"+formdata.min+" "+formdata.meridian;

        console.log(formdata.hour + ":" + formdata.min + " " + formdata.meridian);

        if (!formdata.date){

          this.alertService.error("Invalid date entered!");
          return;

        }

        if (!formdata.meridian || !formdata.hour || !formdata.min) {

            this.alertService.error("Invalid time entered! Attempting to add reminder with no time.", true);

        } else {
            if (formdata.meridian === "pm") {

                formdata.hour = parseInt(formdata.hour) + 12;

            } else if (formdata.meridian === "am") {

                if (formdata.hour === "12") {

                    formdata.hour = 0;

                }

            }
        }

        //console.log(formdata.hour + ":" + formdata.min);

        formdata.notify_date.setMinutes(formdata.min);
        formdata.notify_date.setHours(formdata.hour);

        console.log(formdata.notify_date);

        products.push(formdata);

        console.log(this.auth.currentUserValue);
        //console.log("https://remind-a-p-p.herokuapp.com/reminders/"+this.auth.currentUserValue.user_id);

        this.http.post("https://remind-a-p-p.herokuapp.com/reminders/" + this.auth.currentUserValue.user_id, formdata, {responseType: 'text'}).subscribe((result) => {
            this.router.navigate(['/']);
        });


    }

}
