import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authdata } from '../auth/auth-data.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private users: Authdata[] = []
  private usersUpdated = new Subject<{ users: Authdata[], userCount: number }>()


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

  updateUser(id: string) {
    const user = this.users
    this.http.put("http://localhost:3000/api/user/" + id, user)
      .subscribe(response => {

        this.router.navigate(["/clients"])

      })
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
