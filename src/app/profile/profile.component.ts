import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import {AckService} from "../ack.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  checkValidity!: FormGroup;
  toggleIconOld = 'visibility';
  toggleIconNew = 'visibility';
  toggleIconConfirm = 'visibility';
  emptyInput = {
    'oldPass': '',
    'newPass': '',
    'confirmPass': ''
  }
  // @ts-ignore
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private funServices: AckService) {
  }

  ngOnInit(): void {
    this.checkValidity = this.fb.group({
      'oldPass': new FormControl('', [
        Validators.required,
        Validators.maxLength(90),
        Validators.minLength(8)
      ]),
      'newPass': new FormControl('', [
        Validators.required,
        Validators.maxLength(90),
        Validators.minLength(8)
      ]),
      'confirmPass': new FormControl('', [
        Validators.required,
        Validators.maxLength(90),
        Validators.minLength(8)
      ])
    });
  }

  changePass(oldPass: any, newPass: any, confirmPass: any) {
    if (newPass !== confirmPass) {
      this.Toast("Not Match", "", {duration: 500});
      return;
    }
    let obj: object;
    if (this.funServices.isAdmin()) {
      obj = {
        newPass: newPass,
        oldPass: oldPass,
        user: false
      }
    } else {
      obj = {
        newPass: newPass,
        oldPass: oldPass,
        user: true
      }
    }

    this.funServices.changePassword(obj).subscribe(
      {
        next: (user) => {
        },
        error: (e) => {
          if (e.status === 0)
            this.Toast("Failed to connect Sever", "Dismissed");
          else
            this.Toast(e.error.msgError, "", {duration: 500});
        },
        complete: () => {
          this.Toast("Change Password", "", {duration: 500});
          this.checkValidity.setValue(this.emptyInput);
        }
      }
    )
  }

  Toast = (message: string, action: string, obj?: object) => {
    this.snackBar.open(message, action, obj);
  }

  toggleOldPass(pass: any) {
    if (this.toggleIconOld === 'visibility') {
      this.toggleIconOld = 'visibility_off'
      pass.type = 'text'
    } else {
      this.toggleIconOld = 'visibility';
      pass.type = 'password'
    }
  }

  toggleNewPass(pass: any) {
    if (this.toggleIconNew === 'visibility') {
      this.toggleIconNew = 'visibility_off'
      pass.type = 'text'
    } else {
      this.toggleIconNew = 'visibility';
      pass.type = 'password'
    }
  }

  toggleConfirmPass(pass: any) {
    if (this.toggleIconConfirm === 'visibility') {
      this.toggleIconConfirm = 'visibility_off'
      pass.type = 'text'
    } else {
      this.toggleIconConfirm = 'visibility';
      pass.type = 'password'
    }
  }
}
