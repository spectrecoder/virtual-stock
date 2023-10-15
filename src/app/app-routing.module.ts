import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllocationSplitterComponent } from './allocation-splitter/allocation-splitter.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PortfolioTrackerComponent } from './portfolio-tracker/portfolio-tracker.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'allocationsplitter',component:AllocationSplitterComponent},
  {path:'portfoliotracker',component:PortfolioTrackerComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'**',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
