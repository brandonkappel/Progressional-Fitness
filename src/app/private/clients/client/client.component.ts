import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Authdata } from 'src/app/auth/auth-data.model';
import { Client } from '../../../models/clients.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  private userId: string;
  form: FormGroup;
  isLoading = false;
  user: Client;
  private mode = 'create';



  constructor(public route: ActivatedRoute, private clientService: ClientsService) { }

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
      "personalTrainingClient": new FormControl(null, {
        // validators: [Validators.required]
      }),
      "active": new FormControl(null, {
        // validators: [Validators.required]
      }),

    });
    this.route.paramMap.subscribe((ParamMap: ParamMap) => {
      console.error(ParamMap)
      if (ParamMap.has('userId')) {
        this.mode = 'edit';
        this.userId = ParamMap.get('userId')
        this.isLoading = true
        this.clientService.getUser(this.userId).subscribe((userData: any) => {
          this.isLoading = false
          this.user = userData
          // this.user = {
          //   id: userData._id,
          //   firstName: userData.firstName,
          //   lastName: userData.lastName,
          //   email: userData.email,
          //   role: userData.role,
          //   personalTrainingClient: this.user.personalTrainingClient 

          // };
          console.error(this.user)
          this.form.setValue({
            'firstName': this.user.firstName,
            'lastName': this.user.lastName,
            'email': this.user.email,
            'role': this.user.role,
            'personalTrainingClient': this.user.personalTrainingClient,
            'active': this.user.active
          });
        })
      } else {
        this.mode = 'create';
        this.userId = null
      }
    });
  }

  onSavePost() {

    console.error(this.form)
    // return
    if (this.form.invalid) {
      console.error(this.form)
      return
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      // this.clientService.addClient(this.form.value.firstName, this.form.value.lastName, this.form.value.email, this.form.value.role)
      this.clientService.addClient(this.form.value).subscribe(data=> {
        console.error(data)
      })

    } else {
      this.clientService.updateUser(this.userId, this.form.value.firstName, this.form.value.lastName, this.form.value.email, this.form.value.role, this.form.value.personalTrainingClient, this.form.value.active)
    }

  }

}
