import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserData } from '../interfaces/user-data';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient) { }
  signupAPI(userInfo: UserData): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/users/signUp`, userInfo)
  }
  loginAPI(userInfo: UserData): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/users/signIn`, userInfo)
  }
  saveDataMethod() {
    let token = localStorage.getItem('userTokenNotes');
    if ( token != null) {
      this.userToken.next(token);
    }else{
      this.userToken.next(null);
    }
  }
}
