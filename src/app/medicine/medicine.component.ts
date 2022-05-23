import {Component, OnInit} from '@angular/core';
import {MedicineDatasetService} from '../medicine-dataset.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AckService} from "../ack.service";
import {MatDialog} from '@angular/material/dialog';
import {DialogMedicineComponent} from "../dialog-medicine/dialog-medicine.component";
import {FormBuilder, FormControl, FormGroup,Validators} from "@angular/forms";

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  image: string = "./assets/images/medicine_photo.jpg";
  medicine_info: any;
  searchText: string = '';
  length: any;
  validationCheck!: FormGroup;
  emptyInput = {
    'name': '',
    'description': ''
  }

  constructor(
    private funServices: MedicineDatasetService,
    private snackBar: MatSnackBar,
    public Ack: AckService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
  }

  async getMedicines() {
    await this.funServices.GetData().subscribe(
      {
        next: (medicine) => {
          this.length = medicine.length;
          this.medicine_info = medicine;
        }
        ,
        error: (e) => {
          this.length = 0;
          if (e.status === 0)
            this.Toast("Failed to connect Sever", "Dismissed");
          else
            this.Toast(e.error.msgError, "",{duration:500});
        },
        complete: () => console.log("complete")
      }
    );
  }

  addMedicine($name: string, $description: string) {
    const obj: object = {
      Name: $name,
      Description: $description
    }
    this.funServices.AddData(obj).subscribe(
      {
        next: (v) => {
        },
        error: (e) => {
          if (e.status === 0)
            this.Toast("Failed to connect Sever", "Dismissed");
          else
            this.Toast(e.error.msgError, "Dismissed");
        },
        complete: () => {
          this.getMedicines().then(() => {
            this.Toast("Add Medicine", "",{duration:500});
            this.validationCheck.setValue(this.emptyInput);
          });
        }
      }
    )
  }

  getLength(): Boolean {
    return !(this.length == null || this.length === 0);
  }

  Toast = (message: string, action: string, obj?: object) => {
    this.snackBar.open(message, action, obj);
  }

  ngOnInit(): void {
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
    this.getMedicines().then(() =>
      this.getLength()
    );
  }


  infoMedicine(Name: any, Description: any, Id: any) {
    const dialog = this.dialog.open(DialogMedicineComponent, {data: {name: Name, Description: Description}});
    dialog.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      } else {
        const Name = result.toString().split(';')[0];
        const Description = result.toString().split(';')[1];
        const obj = {
          name: Name,
          description: Description,
          id: Id
        }
        this.funServices.UpdateMedicine(obj).subscribe(
          {
            next: (medicine) => {
            },
            error: (e) => {
              if (e.status === 0)
                this.Toast("Failed to connect Sever", "Dismissed");
              else
                this.Toast(e.error.msgError, "Dismissed");
            },
            complete: () => {
              this.getMedicines().then(() => {
                this.Toast("Update Medicine", "",{duration:500});
              });
            }
          }
        );
      }
    });
  }
}
