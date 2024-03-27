import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoading: boolean = false;
  errorMessage:string="";
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
  ) { }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{3,12}$/)]),
    age: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })

  registerSubmit() {
    this.isLoading = true;
    this._AuthService.signupAPI(this.registerForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this._Router.navigate(['/signin'])
        console.log(res);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.msg;
      }
    })

  }
}
