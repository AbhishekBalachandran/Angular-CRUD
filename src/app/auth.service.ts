import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,  } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

export interface authResponse {
  access_token : String;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('access_token');
    this._isLoggedIn.next(!!token);
  }

  signUp(name: string, email: string, password: string, password_confirmation: string) {
    return this.http.post<{access_token: string}>('https://medicalstore.mashupstack.com/api/register',
     {name, email, password, password_confirmation}).pipe(tap(res => {
        this.login(email, password)
    },    
    ),
    catchError(this.handleError))
  }

  login<authResponse>(email:string, password:string) {
    return this.http.post<{token:  string}>('https://medicalstore.mashupstack.com/api/login',
     {email, password}).pipe(tap(res => {
      this._isLoggedIn.next(true);
      localStorage.setItem('access_token', res.token);
    },
    ),
    catchError(this.handleError))
  }

  logout() {
    this._isLoggedIn.next(false);
    this.router.navigate(['/login']);
    localStorage.removeItem('access_token');
    alert('You have logged out successfully.')
  }

  handleError(error) {
    return throwError(error)
  }
}
