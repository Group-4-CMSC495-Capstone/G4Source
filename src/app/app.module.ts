import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartService } from './cart.service';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import {MatCardModule} from "@angular/material/card";
import { AddReminderComponent } from './add-reminder/add-reminder.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {fakeBackendProvider} from "./_helpers/fake-backend";
import {AuthGuard} from "./_helpers/auth.guard";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    RouterModule.forRoot([
      {path: '', component: ProductListComponent, canActivate: [AuthGuard]},
      //{path: '', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'login', component:LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'products/:productId', component: ProductDetailsComponent, canActivate: [AuthGuard]},
      {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
      {path: 'shipping', component: ShippingComponent, canActivate: [AuthGuard]},
      {path: 'settings', component: AccountSettingsComponent, canActivate: [AuthGuard]},
      {path: 'add', component: AddReminderComponent, canActivate: [AuthGuard]},
      {path:'**', redirectTo:''}
    ]),
    MatCardModule,
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    AccountSettingsComponent,
    AddReminderComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent
  ],
  bootstrap: [AppComponent],
  providers: [CartService, fakeBackendProvider,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
