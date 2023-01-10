import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicine } from './medicine';
import { catchError, retry } from 'rxjs/operators';
import { MedicineDetails } from './home/home.component';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  token = localStorage.getItem('access_token');

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  requestOptions = { headers: this.headers };

  create(medicineData) {
    return this.http.post('https://medicalstore.mashupstack.com/api/medicine',medicineData, this.requestOptions).pipe(catchError(this.handleError));
  }

  readAll() {
    return this.http.get<Medicine[]>('https://medicalstore.mashupstack.com/api/medicine', this.requestOptions).pipe(retry(3),catchError(this.handleError))
  }

  readById(id: number) {
    return this.http.get('https://medicalstore.mashupstack.com/api/medicine/'+id, this.requestOptions).pipe(catchError(this.handleError));
  }

  update(id:number,medicineData: MedicineDetails) {
    return this.http.post('https://medicalstore.mashupstack.com/api/medicine/'+id, medicineData, this.requestOptions).pipe(catchError(this.handleError));
  }

  
  delete(id: number) {
    return this.http.delete('https://medicalstore.mashupstack.com/api/medicine/'+id, this.requestOptions).pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError(error)
  }

  
}

