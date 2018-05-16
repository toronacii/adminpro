import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';

import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';

declare function load_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(
	  private userService: UserService,
	  private router: Router
	) { }

  ngOnInit() {
    load_plugins();

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      terms: new FormControl(false)
    }, {
      validators: this.validateEquals('password', 'confirmPassword')
    });
  }

  validateEquals(fieldName1, fieldName2) {
    return (group: FormGroup) => {
      let value1 = group.controls[fieldName1].value;
      let value2 = group.controls[fieldName2].value;

      if (value1 === value2) {
        return null;
      }

      return {
        validateEquals: true
      };
    };
  }

  submit() {
    if (this.form.valid) {
      let model = this.form.value;
      if (!model.terms) {
        swal('Important', 'You must accept the terms and conditions', 'error');
        return;
      }

      let user = new User(
        model.name,
        model.email,
        model.password
      );
      this.userService
        .create(user)
        .subscribe(userCreated => this.router.navigate([ '/login', userCreated ]), e => swal('Error', e.error.message));
    }
  }

}
