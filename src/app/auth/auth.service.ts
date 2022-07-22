import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authdata } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Client } from '../private/clients/clients.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment.prod';

const url = environment.apiUrl + "/user/"

@Injectable({ providedIn: "root" })
export class AuthService {

  private isAuthenticated = false;
  private isAdmin = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private adminStatusListener = new Subject<boolean>();
  private userId: string;
  user: Client;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated
  }

  getUserId() {
    return this.userId
  }

  getIsAdmin() {
    return this.isAdmin
  }

  createUser(firstName: string, lastName: string, email: string, password: string) {
    const authData: Authdata = { firstName: firstName, lastName: lastName, email: email, password: password }
    return this.http.post(url+"signup", authData)
      .subscribe(response => {
        console.error(response)
        this.snackBar.open('An Email was sent to ' + email + ' with a verification code' , 'Okay', { verticalPosition: 'top'})
        this.router.navigate(['verify'])

      }, error => {
        console.error(error)
        this.authStatusListener.next(false)
      });
  };

  verify(code: string) {
    this.http.get(url+"verify/" + code).subscribe(response => {
      console.error('verify res:', response)
      if (response) {
        console.error('youre In!')
        this.snackBar.open('Successfully Verified', '', {duration: 2000, verticalPosition: 'top'})
        this.router.navigate(['login'])
      }

    })
  }

  resendCode(email: string){
    this.http.get(url+"resendCode/" + email).subscribe((response: any) => {
      console.error('Resend Code', response)
      if (response){
        console.error('sent')
        this.snackBar.open(response.message, '', {duration: 3000,verticalPosition: 'top'})
      }
    })
  }

  logIn(email: string, password: string) {
    console.error('here?')
    const authData = { email: email, password: password }
    this.http.post<{ token: string, expiresIn: number, userId: string, role: string, active: boolean }>(url+"login", authData)
      .subscribe(response => {
        console.error('Log In:', response)
        const token = response.token;
        this.token = token;
        if (token && response.active) {
          const expiresInDuration = response.expiresIn;
          const role = response.role
          this.setAuthTimer(expiresInDuration)
          this.isAuthenticated = true;
          this.userId = response.userId
          if (role == 'admin') {
            console.error('ADMIN')
            this.isAdmin = true
            this.adminStatusListener.next(true)
          }
          console.error('AFTER ADMIN ')
          this.authStatusListener.next(true);
          const now = new Date()
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId, role)
          // this.getUser()
          this.router.navigate(['fitness'])
        } else {
          this.router.navigate(['verify'])
          console.error('not active')
        }
      }, error => {
        this.authStatusListener.next(false)
      });
  };

  getUser() {
    this.http.get<{ _id: string, firstName: string, lastName: string, email: string, role: string }>(url + this.userId).subscribe(user => {
      this.user = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
      if (user.role == 'admin') {
        console.error('ADMIN')
        this.isAdmin = true;
        this.adminStatusListener.next(true)
      }

    })
  }

  // getUser(id: string) {
  // return  this.http.get<{ _id: string, firstName: string, lastName: string, email: string, role: string }>("http://localhost:3000/api/user/" + id)

  // }


  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true
      this.userId = authInformation.userId;
      if (authInformation.userRole == 'admin') {
        console.error('ADMIN')
        this.isAdmin = true
        this.adminStatusListener.next(true)
      }
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListener.next(true)
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.authStatusListener.next(false)
    this.adminStatusListener.next(false)
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

  private saveAuthData(token: string, expirationDate: Date, userId: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId)
    localStorage.setItem('userRole', role)
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId')
    localStorage.removeItem('userRole')


  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userRole: userRole
    }
  }


  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAdminStatusListener() {
    return this.adminStatusListener.asObservable();
  }

}
