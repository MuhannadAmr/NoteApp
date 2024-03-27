import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './pages/notes/notes.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path:'' , redirectTo:'notes', pathMatch:'full'},
  {path:'notes' , component:NotesComponent , canActivate:[authGuard] , title:'your notes'},
  {path:'signin' , component:SigninComponent , title:'sign-in'},
  {path:'signup' , component:SignupComponent , title:'sign-up'},
  {path:'**' , component:NotfoundComponent , canActivate:[authGuard] , title:'notFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
