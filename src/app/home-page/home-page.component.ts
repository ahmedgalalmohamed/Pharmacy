import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogMedicineComponent} from "../dialog-medicine/dialog-medicine.component";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  constructor(public dialog: MatDialog
  ) {
  }


}



