import {Component, Injectable} from '@angular/core';

import { products } from '../products';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products;
  now=new Date();

  constructor( private http:HttpClient, private auth:AuthenticationService) {
  }

  delete(id){

    this.http.delete(environment.apiUrl+'/reminders/'+id, {responseType:'text'}).subscribe(result=>{

      this.ngOnInit();

    })

  }

  onNotify(){

    window.alert('You will be notified when the product goes on sale');

  }

  ngOnInit(){

    this.http.get(environment.apiUrl+'/reminders/user/'+this.auth.currentUserValue.user_id).subscribe(result=>{

      this.now=new Date();

      for (let thing in result){

        result[thing].notify_date=new Date(result[thing].notify_date);
        //console.log(result[thing]);

      }
      this.products=result;
      //console.log(result);
    });


  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
