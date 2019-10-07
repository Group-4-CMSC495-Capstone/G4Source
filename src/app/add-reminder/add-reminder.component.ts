import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {products} from "../products";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.css']
})
export class AddReminderComponent implements OnInit {

  addReminderForm;

  constructor( private router:Router, private formBuilder: FormBuilder) {

    this.addReminderForm=this.formBuilder.group({

      name:'',
      date:'',
      time:'',
      description:'',
      noteTime:''

    });

  }

  ngOnInit() {
  }

  onSubmit(formdata){

    console.log(formdata);

    products.push(formdata);

    this.router.navigate(['/']);

  }

}
