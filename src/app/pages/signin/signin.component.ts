import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserData } from 'src/app/core/interfaces/user-data';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  isLoading: boolean = false;
  errorMessage:string = "";

  constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) { }

    loginForm:FormGroup = new FormGroup({
      email:new FormControl(null,[Validators.required , Validators.email]),
      password:new FormControl(null,[Validators.required , Validators.pattern(/^[A-Z][A-Za-z-0-9]{3,12}$/)])
    })

    loginSubmit(){
      this.isLoading = true;
      this._AuthService.loginAPI(this.loginForm.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          localStorage.setItem('userTokenNotes',`3b8ny__${res.token}`);
          this._AuthService.saveDataMethod();
          this._Router.navigate(['/notes']);
        },
        error:(err)=>{
          this.isLoading = false;
          this.errorMessage = err.error.msg
        }
      })
    }
}

