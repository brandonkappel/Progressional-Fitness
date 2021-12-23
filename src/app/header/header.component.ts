import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Client } from '../private/clients/clients.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false
  private authListenerSubs: Subscription;
  private adminListenerSub: Subscription;
  userIsAdmin = false;

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = true;
  isShowing = false;
  isLoading = false ;
  showSubSubMenu: boolean = false;
  userId: string;
  user: Client

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      console.error(this.userIsAuthenticated)
    })
    this.userIsAdmin = this.authService.getIsAdmin()
    this.adminListenerSub = this.authService.getAdminStatusListener().subscribe(isAdmin => {
      this.userIsAdmin = isAdmin;
      console.error('ADMIN?',this.userIsAdmin)
    })
    console.error('is Auth?', this.userIsAuthenticated)
    console.error('ADMIN?',this.userIsAdmin)


    this.userId = this.authService.getUserId()
    // this.authService.getUser(this.userId).subscribe(user => {
    //   this.user = {
    //     id: user._id,
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email,
    //     role: user.role
    //   }
    //   console.error('My User:',this.user)
    // })

  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe()
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
