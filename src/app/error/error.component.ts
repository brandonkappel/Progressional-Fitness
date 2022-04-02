import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorInterceptor } from '../error-interceptor';

@Component({
  templateUrl:'./error.component.html'
})

export class ErrorComponent {
  message = "An Unknown eror occured!"
  error: any ;


  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorInterceptor){
    // console.error('Error', this.data)
    let userError: any = this.data
    console.error('Error', userError.error.error)
    this.error = userError.error.error
  }

}


