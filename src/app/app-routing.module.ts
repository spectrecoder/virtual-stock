import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllocationSplitterComponent } from './allocation-splitter/allocation-splitter.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'stocks',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'allocationsplitter',component:AllocationSplitterComponent},
  {path:'',redirectTo:'allocationsplitter',pathMatch:'full'},
  {path:'**',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
