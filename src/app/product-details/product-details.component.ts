import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { products } from '../products';
import { CartService } from '../cart.service';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";
import {AlertService} from "../_services/alert.service";
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product;
  changeReminderForm;
  prevDate=new Date();
  minDate=new Date();

  constructor(private route: ActivatedRoute, private cartService: CartService, private http:HttpClient, private formBuilder:FormBuilder, private alertService:AlertService, private auth:AuthenticationService) {

    //this.prevDate=new Date(this.product.notify_date);

    this.changeReminderForm = this.formBuilder.group({

      name: '',
      description: '',
      date: '',
      hour: '',
      min: '',
      meridian: '',
      notify_date: ''

    });

  }

  addToCart(product){

    window.alert('You will be reminded!');
    this.cartService.addToCart(product);

  }


  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      this.http.get(environment.apiUrl+'/reminders/'+params.get('productId')).subscribe(result=>{

        this.product=result[0];
        this.prevDate=new Date(this.product.notify_date);
        this.product.notify_date=this.prevDate;

        console.log(result[0]);
      });

    })

  }

  counter(i: number) {
    return new Array(i);
  }


  onSubmit(formdata) {
    
    //this.dummyDate = new Date(formdata.date);
    formdata.notify_date = formdata.date;//this.dummyDate.getMonth()+"/"+this.dummyDate.getDate()+"/"+this.dummyDate.getYear()+" "+formdata.hour+":"+formdata.min+" "+formdata.meridian;

    if (!formdata.date){

      formdata.notify_date=this.product.notify_date;

    }
    console.log(formdata.hour + ":" + formdata.min + " " + formdata.meridian);

    if (!formdata.meridian && !formdata.hour && !formdata.min){

      formdata.notify_date.setHours(this.product.notify_date.getHours());
      formdata.notify_date.setMinutes(this.product.notify_date.getMinutes());

    }


    else if (!formdata.meridian || !formdata.hour || !formdata.min) {

      this.alertService.error("Invalid time entered! Attempting to add reminder with no time.", true);

    } else {
      if (formdata.meridian === "pm") {

        formdata.hour = parseInt(formdata.hour) + 12;

      } else if (formdata.meridian === "am") {

        if (formdata.hour === "12") {

          formdata.hour = 0;

        }

      }

      formdata.notify_date.setMinutes(formdata.min);
      formdata.notify_date.setHours(formdata.hour);
    }

    //console.log(formdata.hour + ":" + formdata.min);


    console.log(formdata.notify_date);

    products.push(formdata);

    console.log(this.auth.currentUserValue);

    console.log(formdata);

    //console.log("https://remind-a-p-p.herokuapp.com/reminders/"+this.auth.currentUserValue.user_id);

    this.http.put("https://remind-a-p-p.herokuapp.com/reminders/" + this.product.event_id, formdata, {responseType: 'text'}).subscribe((result) => {

      this.alertService.success("Reminder changed!");

    });


  }

}
