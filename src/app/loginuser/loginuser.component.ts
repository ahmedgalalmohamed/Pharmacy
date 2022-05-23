import {Component, OnInit} from '@angular/core';
import {AckService} from "../ack.service";
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {fadeInLeftBig} from '../animations'
@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css'],
  animations:[
    fadeInLeftBig
  ]
})
export class LoginuserComponent implements OnInit {
  checkValidity!: FormGroup;
  toggleIcon = 'visibility';
  constructor(
    public funServices: AckService,
    private router: Router,
    private snackBar: MatSnackBar,
    private active: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }


  loginUser(username: string, password: string) {
    const obj: object = {
      username: username,
      password: password,
      user: true
    }
    this.funServices.loginUser(obj).subscribe({
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
    });
    let username = this.active.snapshot.params['username'];
    let password = this.active.snapshot.params['password'];
    if(username===undefined||password===undefined ){
      return;
    }
    this.loginUser(username,password);
  }

  signup() {
    this.router.navigateByUrl('/signup').then();
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
