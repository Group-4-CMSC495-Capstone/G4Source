import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {products} from "../products";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {UserService} from "../_services/user.service";
import {AuthenticationService} from "../_services/authentication.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
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
  minDate=new Date();
  dummyDate;

  constructor( private http:HttpClient, private router:Router, private formBuilder: FormBuilder, private auth:AuthenticationService) {

    this.addReminderForm=this.formBuilder.group({

      name:'',
      description:'',
      date:'',
      hour:'',
      min:'',
      meridian:'',
      notify_date:''

    });

  }

  ngOnInit() {

  }

  counter(i: number) {
    return new Array(i);
  }

  onSubmit(formdata){

    this.dummyDate=new Date(formdata.date);
    formdata.notify_date=formdata.date;//this.dummyDate.getMonth()+"/"+this.dummyDate.getDate()+"/"+this.dummyDate.getYear()+" "+formdata.hour+":"+formdata.min+" "+formdata.meridian;


    console.log(formdata);

    products.push(formdata);

    console.log(this.auth.currentUserValue);
    console.log("https://remind-a-p-p.herokuapp.com/reminders/"+this.auth.currentUserValue.user_id);

    this.http.post("https://remind-a-p-p.herokuapp.com/reminders/"+this.auth.currentUserValue.user_id, formdata, {responseType:'text'}).subscribe((result)=>{

    });


    this.router.navigate(['/'] ).then(() => {
      this.router.navigate(['/']);
    });

  }

}
