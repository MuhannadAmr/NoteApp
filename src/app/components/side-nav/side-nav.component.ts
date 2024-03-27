import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';



@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  constructor(
    private _AuthService:AuthService,
    private _Router:Router
  ){}
  logoutMethod(){
    localStorage.removeItem("userTokenNotes");
    this._AuthService.saveDataMethod();
    this._Router.navigate(['/signin'])
  }


  
}
