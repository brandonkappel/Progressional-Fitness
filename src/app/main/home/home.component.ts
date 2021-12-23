import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Client } from 'src/app/clients/clients.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: Client
  userId: string;

  constructor(private authService: AuthService) {


  }

  ngOnInit(): void {
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

}
