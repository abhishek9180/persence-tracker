import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from '../../material.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ApiService } from '../../api.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [],
  declarations: [LoginComponent],
  providers: [
    ApiService
  ]
})
export class LoginModule { }
