import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(username, password) {

        console.log("Trying to login with: ")
        console.log(username)
        console.log(password)

        return this.http.post<any>(environment.apiUrl+'/authenticate', { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes

                if (!user[0]){

                    console.log("Failed login!");
                    return null;

                }


                console.log("Got user: "+JSON.stringify(user[0]));
                localStorage.setItem('currentUser', JSON.stringify(user[0]));

                console.log(localStorage.getItem('currentUser'));
                this.currentUserSubject.next(user[0]);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
