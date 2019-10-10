import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { products } from '../products';
import { CartService } from '../cart.service';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product;

  constructor(private route: ActivatedRoute, private cartService: CartService, private http:HttpClient) { }

  addToCart(product){

    window.alert('You will be reminded!');
    this.cartService.addToCart(product);

  }


  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      this.http.get(environment.apiUrl+'/reminders/'+params.get('productId')).subscribe(result=>{

        this.product=result[0];
        console.log(result);
      });

    })

  }

}
