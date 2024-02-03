import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../services/auth.service';
import { Client } from '../models/clients.model';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private screenWidth$ = new BehaviorSubject<number>
  (window.innerWidth);
  mode: string;
  openSidenav:boolean;
  width: number;

  constructor(
    private authService: AuthService
  ){}
  

  ngOnInit(){
    // console.error('private')
    this.isUserAdmin = this.authService.getIsAdmin()
    this.user = JSON.parse(localStorage.getItem('user'))
    console.error('USER', this.user)

    this.getScreenWidth().subscribe(width => {
      this.width = width
      if (width < 640) {
      //  this.showToggle = 'show';
       this.mode = 'over';
       this.openSidenav = false;
      //  this.isExpanded = false
     }
     else if (width > 640) {
      //  this.showToggle = 'hide';
       this.mode = 'side';
       this.openSidenav = true;
     }
   });

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }

  openNav(){
    // console.error('clicked')
    if(this.width < 640){
      this.openSidenav = !this.openSidenav
      this.isExpanded = true

    }  else if (this.width > 640) {
      this.isExpanded = !this.isExpanded
    }

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
