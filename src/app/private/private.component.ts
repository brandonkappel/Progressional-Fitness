import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../services/auth.service';
import { Client } from '../models/clients.model';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  isUserAdmin: boolean = false;
  user: Client
  page: String

  constructor(
    private authService: AuthService
  ){}
  

  ngOnInit(){
    console.error('private')
    this.isUserAdmin = this.authService.getIsAdmin()
    this.user = JSON.parse(localStorage.getItem('user'))
    console.error('USER', this.user)


  }

  onLogout(){
    this.authService.logout();
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
