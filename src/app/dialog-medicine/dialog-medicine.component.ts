import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-medicine',
  templateUrl: './dialog-medicine.component.html',
  styleUrls: ['./dialog-medicine.component.css']
})
export class DialogMedicineComponent implements OnInit {
  validationCheck!: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    let updateInput = {
      'name': "kokokok",
      'description': "okokok"
    }
    this.validationCheck = this.fb.group({
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(90)
      ]),
      'description': new FormControl('', [
        Validators.required,
        Validators.minLength(20)
      ])
    });
    this.validationCheck.setValue(updateInput);
  }

}
