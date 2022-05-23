import {Component, OnInit} from '@angular/core';
import {AckService} from "../ack.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-allusers',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  length: any;
  dataSourceSearch: any;
  displayedColumns = ['email','delete'];
  constructor(private funServices: AckService, private snackBar: MatSnackBar,) {
  }

  async getAllUsers() {
    await this.funServices.getAllUsers().subscribe(
      {
        next: (Users) => {
          this.length = Users.length;
          this.dataSourceSearch = new MatTableDataSource(Users);
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
  filter(target: any) {
    this.dataSourceSearch.filter = target.value.trim().toLowerCase();
  }
  getLength(): Boolean {
    return !(this.length == null || this.length === 0);
  }

  Toast = (message: string, action: string, obj?: object) => {
    this.snackBar.open(message, action, obj);
  }


  ngOnInit(): void {
    this.getAllUsers().then();
  }

  delUser(email: string) {
    this.funServices.delUser(email).subscribe(
      {
        next: (User) => {
        },
        error: (e) => {
          this.length = 0;
          if (e.status === 0)
            this.Toast("Failed to connect Sever", "Dismissed");
          else
            this.Toast(e.error.msgError, "Dismissed");
        },
        complete: () => {this.Toast("Delete User","",{duration:500})
        this.getAllUsers().then();
        }
      }
    )
  }
}
