import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products-service.service';
import { Product } from '../../model/product'; // Adjust the path as needed

@Component({
  selector: 'app-details-product',
  standalone: false,
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.css',
})
export class DetailsProductComponent implements OnInit {
  productId: string | null = '';
  product!: Product;
  isLoading: boolean = false;
  constructor(
    private _activeRoute: ActivatedRoute,
    private _productsService: ProductsService
  ) {
    this.productId = this._activeRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getProductId();
  }
  getProductId() {
    this.isLoading = true;
    this._productsService.getProductById(this.productId!).subscribe({
      next: (res) => {
        this.product = res;
        console.log(this.product);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
