import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'home', 
    component: HomeComponent 
  },
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [AuthGuard] // Adiciona a guarda de rota ao acesso à rota /admin
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [AuthGuard] // Adiciona a guarda de rota ao acesso à rota /register
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
