import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email_errors: any = null;
  password_confirmation_errors: any = null;
  errors : any = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signup(data) {
    this.authService.signUp(data.name, data.email, data.password, data.password_confirmation).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (errorMessage) => {
        this.errors = errorMessage
        this.email_errors = errorMessage.error.errors.email;
        this.password_confirmation_errors = errorMessage.error.errors.password_confirmation
      }
    );
  }

}
