import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PharmacyService} from '../pharmacy.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from "@angular/router";
import {AckService} from "../ack.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-profile',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})

export class PharmacyComponent implements OnInit {
  dataSource: any;
  displayedColumns: any;
  length: any;
  name = '';
  loc = '';
  validationCheck!: FormGroup;
  emptyInput = {
    'name': '',
    'location': ''
  }

  constructor(
    private funServices: PharmacyService,
    private snackBar: MatSnackBar,
    private router: Router,
    public Ack: AckService,
    private fb: FormBuilder
  ) {
  }

  displayedColumns__() {
    if (this.Ack.isAdmin()) {
      this.displayedColumns = ['id', 'name', 'location', 'delete'];
    } else {
      this.displayedColumns = ['id', 'name', 'location'];
    }
  }

  async getPharmacies() {
    await this.funServices.GetData().subscribe(
      {
        next: (pharmacy) => {
          this.length = pharmacy.length;
          this.dataSource = new MatTableDataSource(pharmacy);
        },
        error: (e) => {
          this.length = 0;
          if (e.status === 0)
            this.Toast("Failed to connect Sever", "Dismissed");
          else
            this.Toast(e.error.msgError, "Dismissed");
        },
        complete: () => console.log("complete")
      }
    )
  }

  addPharmacy($name: string, $location: string) {
    const obj: object = {
      Name: $name,
      Location: $location
    }
    this.funServices.AddData(obj).subscribe(
      {
        next: (pharmacy) => {
        },
        error: (e) => {
          if (e.status === 0)
            this.Toast("Failed to connect Sever", "Dismissed");
          else
            this.Toast(e.error.msgError, "Dismissed");
        },
        complete: () => {
          this.getPharmacies().then();
          this.Toast("Add Pharmacy", "", {duration: 500});
          this.validationCheck.setValue(this.emptyInput);
        }
      }
    )
  }

  async delPharmacy(id: any) {
    await this.funServices.DelPharmacy(id).subscribe(
      {
        next: (pharmacy) => {
        },
        error: (e) => {
          if (e.status === 0)
            this.Toast("Failed to connect Sever", "Dismissed");
          else
            this.Toast(e.error.msgError, "Dismissed");
        },
        complete: () => {
          this.getPharmacies();
          this.Toast("delete Pharmacy", "",{duration:500});
        }
      }
    )
  }

  getRow(row: any) {
    this.router.navigate(['/med_pha', row.Id]).then().catch(err => {
      console.log(err);
    });
  }

  getLength(): Boolean {
    return !(this.length == null || this.length == 0);
  }

  filter($value: any) {
    this.dataSource.filter = $value.value.trim().toLowerCase();
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
      'location': new FormControl('', [
        Validators.required,
        Validators.minLength(20)
      ])
    });
    this.getPharmacies().then(() => this.getLength());
    this.displayedColumns__();
  }


  showId(id: any) {
    console.log(id);
  }
}
