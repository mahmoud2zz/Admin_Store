import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { ProductsComponent } from './components/products/products.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [DetailsProductComponent, ProductsComponent, ProductComponent],
  imports: [CommonModule, SharedModule],
  exports: [ProductsComponent, DetailsProductComponent, ProductComponent],
})
export class ProductsModule {}
