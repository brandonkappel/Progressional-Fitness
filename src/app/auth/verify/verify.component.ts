import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  public resend: boolean = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  resendCode(){
    this.resend = true 

  }

  verify(form: NgForm){
    if (form.invalid){
      return;
    }
    this.authService.verify(form.value.code)

  }

  sendResend(form: NgForm){
    if(form.invalid){
      return
    }
    this.authService.resendCode(form.value.email)
    this.resend = false 

  }

}
