import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  codeSent: boolean = false
  verified: boolean = false
  userId: any;


  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {

  }


  ngOnInit() {

  }

  sendCode(form: NgForm) {
    if (form.invalid) {
      console.error('herr')
      return
    }
    this.authService.forgotPassword(form.value.email).subscribe((res: any) => {
      console.error(res)
      if (res.error) {
        this.snackBar.open(res.message, '', { duration: 3000, verticalPosition: 'top' })
      } else {
        this.snackBar.open(res.message, '', { duration: 3000, verticalPosition: 'top' })
        this.codeSent = true

      }
    })

  }

  verify(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.passwordCodeVerify(form.value.code).subscribe((res: any) => {
      console.error(res)
      if (res.error) {
        this.snackBar.open(res.message, '', { duration: 3000, verticalPosition: 'top' })
      } else {
        this.snackBar.open(res.message, '', { duration: 3000, verticalPosition: 'top' })
        this.userId = res.userId
        this.verified = true

      }
    })
  }

  newPassword(form: NgForm){
    console.error(form.value.password)
    if (form.invalid) {
      return;
    }
    this.authService.updatePassword(this.userId, form.value.password).subscribe((res:any)=> {
      console.error(res)
      if(res.error){
        this.snackBar.open(res.message, '', { duration: 3000, verticalPosition: 'top' })
      } else {
        this.snackBar.open(res.message, '', { duration: 3000, verticalPosition: 'top' })
        this.userId = null
        this.router.navigateByUrl('/login')
      }
    })
  }


  resendCode() {

  }




}
