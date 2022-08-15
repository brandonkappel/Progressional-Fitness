import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Client } from 'src/app/private/clients/clients.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: Client
  userId: string;
  isUserAdmin: boolean = false;
  private adminStatusSub: Subscription

  constructor(private authService: AuthService) {


  }

  ngOnInit(): void {
    // console.error(this.authService.getIsAdmin())
    this.isUserAdmin = this.authService.getIsAdmin()
    
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

}
