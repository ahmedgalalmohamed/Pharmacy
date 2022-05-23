import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(private httpClient: HttpClient) {
  }

  purl = "http://localhost:3000/pharmacy"
  purl_ = "http://localhost:3000/med_phar/"

  GetData(): Observable<any> {
    return this.httpClient.get<any>(`${this.purl}`)
  }

  GetDataMedForPha($id: any) {
    return this.httpClient.get<any>(`${this.purl_ + $id}`);
  }

  GetDataSelect($id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.purl_ + 'mfp/' + $id}`);
  }

  AddData($obj: object) {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify($obj);
    return this.httpClient.post(`${this.purl}`, body, {'headers': headers});
  }

  addMedToPha($obj: object) {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify($obj);
    return this.httpClient.post(`${this.purl_}`, body, {'headers': headers})
  }

  DelPharmacy($id: any) {
    return this.httpClient.delete(`${this.purl + '/' + $id}`);
  }

  delMed($idp: any, $idm: any) {
    return this.httpClient.delete(`${this.purl_ + $idp + '/' + $idm}`);
  }
}
