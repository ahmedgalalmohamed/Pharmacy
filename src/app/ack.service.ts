import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AckService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  public isAuthenticated(): Boolean {
    let adminData = localStorage.getItem('admin');
    let userData = localStorage.getItem('user');

    if (!this.isLoggedIn()) {
      localStorage.clear();
      return false;
    }
    return !!((adminData && JSON.parse(adminData)) || (userData && JSON.parse(userData)));
  }

  public isAdmin(): Boolean {
    let adminData = localStorage.getItem('admin');
    return !!(adminData && JSON.parse(adminData));
  }

  isLoggedIn() {
    let exp = localStorage.getItem('exp');
    const dateNow = (Math.floor((new Date).getTime() / 1000));
    return !(dateNow >= parseFloat(<string>exp));
  }

  purl = "http://localhost:3000/"

  public setTokenAdmin(admin: any) {
    localStorage.setItem("admin", JSON.stringify(admin));
  }

  public setTokenUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  public setExpireToken(expire: any) {
    localStorage.setItem("exp", JSON.stringify(expire));
  }

  loginAdmin($obj: object) {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify($obj);
    return this.httpClient.post(`${this.purl + 'userauth/signin'}`, body,
      {headers: headers, withCredentials: true});
  }

  loginUser($obj: object) {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify($obj);
    return this.httpClient.post(`${this.purl + 'userauth/signin'}`, body,
      {headers: headers, withCredentials: true});
  }

  addUser($obj: object) {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify($obj);
    return this.httpClient.post(`${this.purl + 'userauth/signup'}`, body,
      {headers: headers, withCredentials: true});
  }

  changePassword(obj: object) {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(obj);
    return this.httpClient.put(`${this.purl + 'userauth/changepassword'}`, body,
      {headers: headers, withCredentials: true});
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.purl + 'userauth/allusers'}`);
  }

  delUser(email:string) {
    return this.httpClient.delete(`${this.purl + 'userauth/deluser/' + `${email}`}`)
  }
}
