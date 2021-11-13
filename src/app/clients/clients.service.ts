import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client,  } from './clients.model';
import { last, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

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
      'http://localhost:3000/api/user' + queryParams)
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

  updateUser(id: string, firstName: string, lastName: string, email: string, role: string) {
    const user: Client = {id: id, firstName: firstName, lastName: lastName, email: email, role: role }
    console.error(user)
    this.http.put("http://localhost:3000/api/user/" + id, user)
      .subscribe(response => {
        console.error(response)
        this.router.navigate(["/clients"])

      })
  }

  addClient(firstName: string, lastName: string, email: string) {

    const clientData = {firstName: firstName, lastName: lastName, email:email}

    this.http.post<{ message: string, userId: any }>('http://localhost:3000/api/user/newUser', clientData)
      .subscribe((responseData) => {
        console.error(responseData)
        this.router.navigate(["/"])
      });

  }

  getPostUpdatedListener() {
    return this.usersUpdated.asObservable();
  }
  getUser(id: string) {
    return this.http.get<{ _id: string, firstName: string, lastName: string, email: string, role: string }>("http://localhost:3000/api/user/" + id);
  }

  deletePost(userId: string) {
    return this.http.delete("http://localhost:3000/api/user/" + userId)

  }


}
