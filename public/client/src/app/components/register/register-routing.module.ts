import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
// import {} from './components/adhoc-sales/adhoc-sales.routing'

export const routes: Routes = [
  {
    path: '',
    component: RegisterComponent, data: { title: 'Register' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RegisterRoutingModule { }
