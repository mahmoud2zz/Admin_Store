import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../model/product'; // Adjusted the path to the correct location

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Output() item: EventEmitter<{ product: Product; amount: number }> =
    new EventEmitter();
  disbled: boolean = false;
  amount: number = 0;
  constructor() {}

  ngOnInit(): void {}

  addToCart(): void {
    this.disbled = !this.disbled;

    this.item.emit({ product: this.product, amount: this.amount });
  }
}
