import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/components/products/products.component';
import { DetailsProductComponent } from './products/components/details-product/details-product.component';
import { CartComponent } from './cart/components/cart/cart.component';
const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'products', component: ProductsComponent },

  { path: 'details-product/:id', component: DetailsProductComponent },

  { path: '**', redirectTo: 'cart', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
