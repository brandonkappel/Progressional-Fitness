import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Client } from '../../models/clients.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientsService } from 'src/app/services/clients.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  users: Client[] = [];

  isLoading = false
  totalUsers = 0
  usersPerPage = 5
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10]
  public userIsAuthenticated = false
  public userIsAdmin = false
  private usersSub: Subscription;
  private authStatusSub: Subscription


  userId: string



  constructor(public authService: AuthService, private clientService: ClientsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true
    this.clientService.getUsers(this.usersPerPage, this.currentPage)
    this.usersSub = this.clientService.getUserUpdatedListener()
      .subscribe((userData: { users: Client[], userCount: number }) => {
        this.isLoading = false
        this.totalUsers = userData.userCount
        this.users = userData.users;
      });
      this.userIsAuthenticated = this.authService.getIsAuth()
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated =>{
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId()
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

  openDelete(templateRef, user){
    console.error(user)
    let dialogRef = this.dialog.open(templateRef, {
      data: {
        user: user
      }
    })
  }

  onDelete(userId: string) {
    this.isLoading = true

    this.clientService.deletePost(userId).subscribe(()=>{
      this.clientService.getUsers(this.usersPerPage, this.currentPage)
      this.dialog.closeAll()
    });
  }

}
