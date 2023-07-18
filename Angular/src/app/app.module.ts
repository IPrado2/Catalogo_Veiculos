import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarcasComponent } from './marcas/marcas.component';
import { ShowMarcasComponent } from './marcas/show-marcas/show-marcas.component';
import { ModelosComponent } from './modelos/modelos.component';
import { ShowModelosComponent } from './modelos/show-modelos/show-modelos.component';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { ShowVeiculosComponent } from './veiculos/show-veiculos/show-veiculos.component';
import { ShowConfigComponent } from './config/show-config/show-config.component';
import { SharedService } from './shared.service';
import { SharedFileService } from './shared-file.service';
import { NotificationService } from './notification.service';
import { TokenInterceptor } from './token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegisterComponent } from './register/register.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    MarcasComponent,
    ShowMarcasComponent,
    ModelosComponent,
    ShowModelosComponent,
    VeiculosComponent,
    ShowVeiculosComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    RegisterComponent,
    ShowConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatMenuModule
  ],
  providers: [
    SharedService, 
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    CookieService,
    SharedFileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
