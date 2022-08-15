import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public userIsAuthenticated = false
  private authStatusSub: Subscription
  isUserAdmin: boolean = false;
  adminStatusSub: Subscription;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.autoAuthUser();
    // console.error(this.authService.getIsAuth())
    this.userIsAuthenticated = this.authService.getIsAuth()
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated =>{
        this.userIsAuthenticated = isAuthenticated;
        // console.error(this.userIsAuthenticated)
      })
   
    }
}
