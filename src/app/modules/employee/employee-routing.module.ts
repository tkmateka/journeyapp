import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { LandingComponent } from '../shared/landing/landing.component';
import { ProfileComponent } from '../shared/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee/profile', pathMatch: 'full' }, // redirect to `first-component`
  {
    path: '', component: LandingComponent, children: [
      { path: 'profile', component: ProfileComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
