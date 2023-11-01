import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  // selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  account:any = {}
  private  authStatusSub: Subscription

  constructor(
    public authService: AuthService,
    private formbuilder: FormBuilder,
    ) {
      this.loginForm = this.formbuilder.group({
        email: ['', Validators.required],
        password:['', Validators.required]
      })

   }




  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'))
    this.loginForm.controls.email.setValue(user.email)
  
  
 
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus =>{
        this.isLoading = false;
      }
    )

   

  }

  onLogin(){
    // console.error(this.loginForm)
    if(this.loginForm.invalid){
      return
    }
    this.isLoading = true;
    this.authService.logIn(this.loginForm.value.email, this.loginForm.value.password)
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe
  }
}
