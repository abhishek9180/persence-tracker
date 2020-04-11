import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ApiInterceptor } from '../../interceptors/app.interceptor';

import { environment } from '../../../environments/environment';
import { ApiService } from '../../api.service';
import { HomeService } from './home.service';
import { MaterialModule } from '../../material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DialogComponent } from '../../shared/dialog/dialog.component';

const config: SocketIoConfig = { url: environment.baseUrl, options: { path: 'api/socket/doc' } };

@NgModule({
  declarations: [HomeComponent, DialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SocketIoModule.forRoot(config),
    HomeRoutingModule
  ],
  providers: [
    ApiService,
    HomeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ]
})
export class HomeModule { }
