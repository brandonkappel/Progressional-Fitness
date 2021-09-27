import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService } from '../clients.service';
import { Subscription } from 'rxjs';

import { Authdata } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  private userId: string;
  form: FormGroup;
  isLoading = false;
  user: any;



  constructor( public route: ActivatedRoute, private clientService: ClientsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "firstName": new FormControl(null, {
        validators: [Validators.required,
        Validators.minLength(3)]
      }),
      "lastName": new FormControl(null, {
        validators: [Validators.required]
      }),
      // image: new FormControl(null, {
      //   validators: [Validators.required],
      //   asyncValidators: [mimeType]
      // })
      "email": new FormControl(null, {
        validators: [Validators.required]
      }),
      "role": new FormControl(null, {
        validators: [Validators.required]
      }),

    });
    this.route.paramMap.subscribe((ParamMap: ParamMap) => {
      if (ParamMap.has('userId')) {

        this.userId = ParamMap.get('userId')
        this.isLoading = true
        this.clientService.getUser(this.userId).subscribe(userData => {
          this.isLoading = false
          this.user = userData
          // this.user = {
          //   id: userData._id,
          //   firstName: userData.firstName,
          //   lastName: userData.lastName,
          //   email: userData.email

          // };
          console.error(this.user)
          this.form.setValue({
            'firstName': this.user.firstName,
            'lastName': this.user.lastName,
            'email': this.user.email,
            'role': this.user.role
          });
        })
      } else {
        // this.mode = 'create';
        this.userId = null
      }
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      console.error(this.form)
      return
    }
    console.error(this.form)
    this.isLoading = true;
    console.error(this.isLoading)

   this.clientService.updateUser(this.userId)

    this.clientService.getUser(this.user)





    // this.router.navigateByUrl('')
    // this.form.reset();
  }

}