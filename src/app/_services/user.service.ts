import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {HttpHeaders} from '@angular/common/http';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*'
    })
};

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(environment.apiUrl+'/users');
    }

    register(user) {
        console.log(user);
        console.log(environment.apiUrl+'/users');

        return this.http.post("https://remind-a-p-p.herokuapp.com/users", user, httpOptions);
        //return this.http.post(environment.apiUrl+'/users', user);
    }

    delete(id) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}
