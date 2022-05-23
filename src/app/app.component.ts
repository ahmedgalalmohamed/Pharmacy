import {Component, OnInit} from '@angular/core';
import {AckService} from './ack.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {fadeIn} from "./animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    fadeIn
  ]
})
export class AppComponent implements OnInit {
  title = 'Pharmacy';
  name = 'Get Current Url Route Demo';
  image: string = "assets/images/logo.png"

  checkValidity!: FormGroup;

  constructor(
    private router: Router,
    private loc: Location,
    private snackBar: MatSnackBar,
    public funServices: AckService,
    private fb: FormBuilder
  ) {
  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl('/loginuser').then();
  }

  login(email: any, pass: any) {
    const obj_: object = {
      username: email,
      password: pass,
      user: true
    }
    this.funServices.loginUser(obj_).subscribe({
      next: (data) => {
        // @ts-ignore
        this.funServices.setTokenUser(data.token);
        // @ts-ignore
        this.funServices.setExpireToken(data.exp);
        this.router.navigateByUrl('/').then();
      },
      error: (e) => {
        if (e.status === 0)
          this.Toast("Failed to connect Sever", "Dismissed");
        else {
          this.Toast(e.error.msgError, "Dismissed");
        }
      },
      complete: () => console.log("complete")
    });
  }

  Toast = (message: string, action: string, obj?: object) => {
    this.snackBar.open(message, action, obj);
  };
  email: any;
  pass: any;

  checkUrl(): Boolean {
    return this.loc.path() == '';
  }

  ngOnInit(): void {
    this.checkValidity = this.fb.group({
      'email': new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(90)
      ]),
      'pass': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(90)
      ])
    });
  }
}
