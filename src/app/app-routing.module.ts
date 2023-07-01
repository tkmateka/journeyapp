import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import { BaseComponent } from './components/auth/base/base.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/base/login', pathMatch: 'full' }, // redirect to `first-component`
  {
    path: 'base', component: BaseComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  {
    path: 'employee',
    loadChildren: () => import('./modules/employee/employee.module').then(module => module.EmployeeModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(module => module.AdminModule),
    canActivate: [AdminGuard]
  },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
