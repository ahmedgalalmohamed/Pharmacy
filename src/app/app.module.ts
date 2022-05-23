import {NgModule} from '@angular/core';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogMedicineComponent} from './dialog-medicine/dialog-medicine.component';
//#region Material
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
//#endregion

//#region components
import {LoginadminComponent} from './loginadmin/loginadmin.component';
import {MedicineComponent} from './medicine/medicine.component';
import {MedPhaComponent} from './med-pharm/med-pha.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PharmacyComponent} from './pharmacy/pharmacy.component';
import {AppComponent} from './app.component';
//#endregion

//#region services
import {AuthGuardService as AuthGuard} from './auth-guard.service';
import {AckService} from './ack.service';
import {PharmacyService} from './pharmacy.service'
import {MedicineDatasetService} from './medicine-dataset.service';
import {LoginuserComponent} from './loginuser/loginuser.component';
import {AuthInterceptor} from "./auth.interceptor";
import {SignupComponent} from './signup/signup.component';
import {NotAuthGuard} from "./not-auth.guard";
import {ProfileComponent} from './profile/profile.component';
import { AllUsersComponent } from './allusers/all-users.component';
import {IsAdminGuard} from "./is-admin.guard";
//#endregion services


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PharmacyComponent,
    MedicineComponent,
    MedPhaComponent,
    LoginadminComponent,
    LoginuserComponent,
    DialogMedicineComponent,
    SignupComponent,
    ProfileComponent,
    AllUsersComponent
  ],
  entryComponents: [DialogMedicineComponent],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    AppRoutingModule
  ],
  providers: [MedicineDatasetService, AckService, PharmacyService,
    NotAuthGuard,
    AuthGuard,
    IsAdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
