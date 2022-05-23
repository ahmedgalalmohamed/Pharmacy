import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AckService} from "../ack.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {fadeInUpBig} from '../animations'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    fadeInUpBig
  ]
})
export class SignupComponent implements OnInit {
  checkValidity!: FormGroup;
  toggleIcon = 'visibility';

  constructor(private funServices: AckService, private snackBar: MatSnackBar, private router: Router, private fb: FormBuilder) {
  }

  signupUser(name: string, pass: string) {
    let obj: object = {
      username: name.trim(),
      password: pass
    };
    this.funServices.addUser(obj).subscribe(
      {
        next: (user) => {
        },
        error: (e) => {
          if (e.status === 0)
            this.Toast("Failed to connect Sever", "Dismissed");
          else
            this.Toast(e.error.msgError, "Dismissed");
        },
        complete: () => {
          this.Toast("Add User", "Dismissed", {duration: 1000});
          this.router.navigate(['/loginuser', {username: name, password: pass}]).then();
        }
      }
    )
  }

  Toast = (message: string, action: string, obj?: object) => {
    this.snackBar.open(message, action, obj);
  }

  ngOnInit(): void {
    this.checkValidity = this.fb.group({
      'email': new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(90),
      ]),
      'pass': new FormControl('', [
        Validators.required,
        Validators.maxLength(90),
        Validators.minLength(8)
      ])
    })
  }

  login() {
    this.router.navigateByUrl('/loginuser').then();
  }
  togglePass(pass:any) {
    if(this.toggleIcon === 'visibility'){
      this.toggleIcon = 'visibility_off'
      pass.type = 'text'
    }
    else {
      this.toggleIcon = 'visibility';
      pass.type = 'password'
    }
  }
}
