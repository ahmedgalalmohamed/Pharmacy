import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PharmacyService} from '../pharmacy.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from "@angular/material/table";
import {AckService} from "../ack.service";
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-about-us',
  templateUrl: './med-pha.component.html',
  styleUrls: ['./med-pha.component.css'],
})

export class MedPhaComponent implements OnInit {
  length: any;
  dataSourceSearch: any;
  displayedColumns: any;
  RMedicine: any;
  lengthAllMed: any;
  medicineControl = new FormControl('', Validators.required);

  constructor(
    private routing: ActivatedRoute,
    private funServices: PharmacyService,
    private snackBar: MatSnackBar,
    public Ack: AckService,
  ) {
  }

  displayedColumns__() {
    if (this.Ack.isAdmin()) {
      this.displayedColumns = ['id', 'name', 'description', 'delete'];
    } else {
      this.displayedColumns = ['id', 'name', 'description'];
    }
  }

  async getMedForPha() {
    let Id = this.routing.snapshot.params['id']
    await this.funServices.GetDataMedForPha(Id).subscribe(
      {
        next: (medicine) => {
          this.length = medicine.length;
          this.dataSourceSearch = new MatTableDataSource(medicine);
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

  async getMedicines() {
    let Id = this.routing.snapshot.params['id']
    await this.funServices.GetDataSelect(Id).subscribe(
      {
        next: (medicine) => {
          this.lengthAllMed = medicine.length;
          this.RMedicine = medicine;
        }
        ,
        error: (e) => {
          this.lengthAllMed = 0;
          if (e.status === 0)
            this.Toast("Failed to connect Sever", "Dismissed");
          else
            this.Toast(e.error.msgError, "Dismissed");
        },
        complete: () => console.log("complete")
      }
    );
  }


  addMedToPha(select: any) {
    let phaId_ = parseInt(this.routing.snapshot.params['id']);
    let medId = select.selected;
    if (medId === undefined) {
      return this.Toast("Select Is Empty", "", {duration: 500});
    }
    const obj = {
      phaId: phaId_,
      medId: medId.value
    }
    this.funServices.addMedToPha(obj).subscribe(
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
          this.getMedForPha().then(() => this.Toast("Add Medicine", "",{duration:500}));
          this.getMedicines().then();
        }
      }
    )
  }

  delMed(ID: any) {
    let phaId = parseInt(this.routing.snapshot.params['id']);
    this.funServices.delMed(phaId, ID).subscribe(
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
          this.getMedForPha().then(() => this.Toast("Del Medicine", "",{duration:500}));
          this.getMedicines().then();
        }
      }
    )
  }

  filter(target: any) {
    this.dataSourceSearch.filter = target.value.trim().toLowerCase();
  }

  getRow(row: any) {
    window.open(`https://www.google.com/search?q=${row.Name}&tbm=isch`, "__blank");
  }

  getLength(): Boolean {
    return !(this.length == null || this.length === 0);
  }

  Toast = (message: string, action: string, obj?: object) => {
    this.snackBar.open(message, action, obj);
  }


  ngOnInit(): void {
    this.getMedForPha().then(() => this.getLength());
    this.getMedicines().then();
    this.displayedColumns__();
  }


}

