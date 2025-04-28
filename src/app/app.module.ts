import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './products/components/products/products.component';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    CartModule,
    ProductsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
