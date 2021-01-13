import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ClientsService } from './clients.service';
import { Authdata } from '../auth/auth-data.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  users: Authdata[] = [];

  isLoading = false
  totalUsers = 0
  usersPerPage = 5
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10]
  public userIsAuthenticated = false
  private usersSub: Subscription;

  userId: string



  constructor(private authService: AuthService, private clientService: ClientsService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.clientService.getUsers(this.usersPerPage, this.currentPage)
    this.usersSub = this.clientService.getPostUpdatedListener()
      .subscribe((userData: { users: Authdata[], userCount: number }) => {
        this.isLoading = false
        this.totalUsers = userData.userCount
        this.users = userData.users;
        console.error(this.users)

      });
  }

  toggleAdmin(event: any){
    console.error(event.value)
    this.users['role'] = event.value
    console.error(this.users['role'])
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true
    this.currentPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize;
    this.clientService.getUsers(this.usersPerPage, this.currentPage);
  }

  onDelete(userId: string) {
    this.isLoading = true

    this.clientService.deletePost(userId).subscribe(()=>{
      this.clientService.getUsers(this.usersPerPage, this.currentPage)
    });
  }

}
