import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicineDatasetService {

  constructor(private httpClient: HttpClient) {
  }

  purl = "http://localhost:3000/medicine"

  GetData(): Observable<any> {
    return this.httpClient.get<any>(`${this.purl}`);
  }

  AddData($obj: object) {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify($obj);
    return this.httpClient.post(`${this.purl}`, body, {'headers': headers})
  }

  UpdateMedicine($obj: object) {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify($obj);
    return this.httpClient.put(`${this.purl}`, body, {'headers': headers})
  }

}
