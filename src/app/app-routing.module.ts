import { NgModule } from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {PharmacyComponent} from "./pharmacy/pharmacy.component";
import {AuthGuardService as AuthGuard} from "./auth-guard.service";
import {MedicineComponent} from "./medicine/medicine.component";
import {MedPhaComponent} from "./med-pharm/med-pha.component";
import {LoginadminComponent} from "./loginadmin/loginadmin.component";
import {NotAuthGuard} from "./not-auth.guard";
import {LoginuserComponent} from "./loginuser/loginuser.component";
import {SignupComponent} from "./signup/signup.component";
import {ProfileComponent} from "./profile/profile.component";
import {AllUsersComponent} from "./allusers/all-users.component";
import {IsAdminGuard} from "./is-admin.guard";

//#region Routers
const routes: Route[] = [
  {path: '', component: HomePageComponent},
  {path: 'pharmacy', component: PharmacyComponent, canActivate: [AuthGuard]},
  {path: 'medicine', component: MedicineComponent, canActivate: [AuthGuard]},
  {path: 'med_pha/:id', component: MedPhaComponent, canActivate: [AuthGuard]},
  {path: 'loginadmin', component: LoginadminComponent, canActivate: [NotAuthGuard]},
  {path: 'loginuser', component: LoginuserComponent, canActivate: [NotAuthGuard]},
  {path: 'loginuser/:username/:password', component: LoginuserComponent, canActivate: [NotAuthGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [NotAuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path:'allusers',component:AllUsersComponent,canActivate:[IsAdminGuard]},
  {path: "**", redirectTo: ''}
]

//#endregion

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
