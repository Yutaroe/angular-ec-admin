import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddProductComponent } from './add-product/add-product.component';
import { AddToppingComponent } from './add-topping/add-topping.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyUserComponent } from './buy-user/buy-user.component';
import { DetailComponent } from './detail/detail.component';
import { ErrorMessageingComponent } from './error-messageing/error-messageing.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { ToppinglistComponent } from './toppinglist/toppinglist.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    ErrorMessageingComponent,
    ListComponent,
    AddProductComponent,
    AddToppingComponent,
    ToppinglistComponent,
    BuyUserComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
