import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client,  } from './clients.model';
import { last, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const url = environment.apiUrl + "/user/"


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private users: Client[] = []
  private usersUpdated = new Subject<{ users: Client[], userCount: number }>()


  constructor(private http: HttpClient, private router: Router) { }



  getUsers(usersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${usersPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, users: any, maxUsers: number }>(
      url + queryParams)
      .pipe(map((userData) => {
        return {
          users: userData.users.map(user => {
            return {
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              email: user.email,
              id: user._id,
              creator: user.creator
            };
          }), maxUsers: userData.maxUsers
        };
      }))
      .subscribe((transformedUserData) => {
        this.users = transformedUserData.users;
        this.usersUpdated.next({ users: [...this.users], userCount: transformedUserData.maxUsers });
      });
  }

  updateUser(id: string, firstName: string, lastName: string, email: string, role: string, personalTrainingClient: boolean) {
    const user: Client = {id: id, firstName: firstName, lastName: lastName, email: email, role: role, personalTrainingClient: personalTrainingClient }
    console.error(user)
    this.http.put(url + id, user)
      .subscribe(response => {
        console.error(response)
        this.router.navigate(["/clients"])

      })
  }

  // addClient(firstName: string, lastName: string, email: string, role: string) {

  //   const clientData = {firstName: firstName, lastName: lastName, email:email, role: role}

  //   this.http.post<{ message: string, userId: any }>(url+'newUser', clientData)
  //     .subscribe((responseData) => {
  //       console.error(responseData)
  //       this.router.navigate(["/"])
  //     });

  // }

  addClient(client) {

    // const clientData = {firstName: firstName, lastName: lastName, email:email, role: role}

   return this.http.post(url+'newUser', client)
      // .subscribe((responseData) => {
      //   console.error(responseData)
      //   this.router.navigate(["/"])
      // });

  }

  getUserUpdatedListener() {
    return this.usersUpdated.asObservable();
  }
  getUser(id: string) {
    return this.http.get<{ _id: string, firstName: string, lastName: string, email: string, role: string }>(url + id);
  }

  deletePost(userId: string) {
    return this.http.delete(url + userId)

  }


}
