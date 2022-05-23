import {Component, OnInit} from '@angular/core';
import {AckService} from "../ack.service";
import {Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {fadeInLeftBig} from '../animations'
@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css'],
  animations:[
    fadeInLeftBig
  ]
})
export class LoginadminComponent implements OnInit {
  checkValidity!: FormGroup;
  toggleIcon = 'visibility';


  constructor(
    public funServices: AckService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb:FormBuilder
  ) {
  }


  loginAdmin(username: string, password: string) {
    const obj: object = {
      username: username,
      password: password,
      user: false
    }
    this.funServices.loginAdmin(obj).subscribe({
      next: (data) => {
        // @ts-ignore
        this.funServices.setTokenAdmin(data.token);
        // @ts-ignore
        this.funServices.setExpireToken(data.exp);
        this.router.navigateByUrl('/').then();
      },
      error: (e) => {
        if (e.status === 0)
          this.Toast("Failed to connect Sever", "Dismissed");
        else
          this.Toast(e.error.msgError, "Dismissed");
      },
      complete: () => console.log("complete")
    });
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
    });
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
