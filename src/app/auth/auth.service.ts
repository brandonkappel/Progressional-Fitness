import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authdata } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Injectable({ providedIn: "root" })
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private userId: string;

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated
  }

  getUserId(){
    return this.userId
  }

  createUser(firstName: string, lastName: string, email: string, password: string, id: string) {
    const authData: Authdata = {firstName: firstName, lastName: lastName, email: email, password: password , id: id}
    this.http.post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.error(response)
        this.token
      });
  };

  logIn(email: string, password: string) {
    const authData = { email: email, password: password }
    this.http.post<{ token: string, expiresIn: number, userId: string }>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration)
          this.isAuthenticated = true;
          this.userId = response.userId
          this.authStatusListener.next(true);
          const now = new Date()
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.error(expirationDate);
          this.saveAuthData(token, expirationDate, this.userId)
          this.router.navigate(['/'])
        }
      });
  };

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.error(authInformation, expiresIn)
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListener.next(true)
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false)
    clearTimeout(this.tokenTimer)
    this.clearAuthData
    this.userId = null;
    this.router.navigate(['/'])

  }

  private setAuthTimer(duration: number) {
    console.error("setting timer: " + duration)
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId)
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId')

  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }


  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

}
