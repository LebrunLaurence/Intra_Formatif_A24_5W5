import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CatComponent } from './cat/cat.component';
import { DogComponent } from './dog/dog.component';
import { userGuardGuard } from './user-guard.guard';
import { catGuard } from './cat.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'cat', component: CatComponent,canActivate:[userGuardGuard,catGuard] },
  { path: 'dog', component: DogComponent,canActivate:[userGuardGuard] },
  { path: 'home', component: HomeComponent,canActivate:[userGuardGuard] },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
