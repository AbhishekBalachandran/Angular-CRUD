import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors: any = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(data) {
    this.authService.login(data.email, data.password).subscribe(
      (response) => {
        this.router.navigate(['/home']);
      },
      (errorMessage) => {
        this.errors = errorMessage.error.errors;
      }
    );
  }

}
