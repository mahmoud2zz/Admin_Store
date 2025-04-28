import { Component } from '@angular/core';
import { CartService } from '../../services/cart-service.service';
import { Product } from '../../../products/model/product'; // Adjust the path as needed
import { Cart } from '../../models/cart'; // Adjust the path as needed
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  carts: Cart[] | null = [];
  products: Product[] = [];
  form!: FormGroup;
  totalPrice: number = 0;
  constructor(private _crarService: CartService, private _build: FormBuilder) {}

  ngOnInit(): void {
    this.getAllCarts();
    this.form = this._build.group({
      startDate: [''],
      endDate: [''],
    });
  }

  getAllCarts() {
    this._crarService.getAllCarts().subscribe({
      next: (res) => {
        this.carts = res.data;
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filterCarts() {
    console.log(this.form.value);

    this._crarService
      .filterCarts(this.form.value.startDate, this.form.value.endDate)
      .subscribe({
        next: (res) => {
          this.carts = res.data;
          console.log(res);
        },
      });
  }

  deleteCart(idCart: number): void {
    const cartIndex = this.carts!.findIndex((cart) => cart.id === idCart);

    if (cartIndex !== -1) {
      // Optimistically remove the cart from UI
      this.carts!.splice(cartIndex, 1);

      this._crarService.deleteCart(idCart).subscribe({
        next: (res) => {
          console.log('Cart deleted successfully:', res);
          // Optionally, you can show a success message or perform other actions here
        },
        error: (err) => {
          console.error('Failed to delete cart:', err);
        },
      });
    } else {
      console.warn(`Cart with ID ${idCart} not found.`);
    }
  }
  DetailsProducts(index: number) {
    this.products = this.carts![index].products;
    console.log(this.products);
    for (const product of this.products) {
      console.log(product);
      this._crarService.getProudct(product.id).subscribe({
        next: (res) => {
          console.log(res);
          this.products.push(res);
          this.calculateTotalPrice();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    for (const product of this.products) {
      this.totalPrice += product.price * product.quantity;
    }
  }
  trackById(index: number, item: any): number {
    return item.id;
  }
  // getCartProducts() {
  //   // if ('cart' in localStorage) {
  //   //   this.cartProducts = JSON.parse(localStorage.getItem('cart') ?? '');
  //   //   this.calculateTotalPrice();
  // }
}

// addAmount(index: number): void {
//   this.cartProducts[index].amount++;
//   localStorage.setItem('cart', JSON.stringify(this.cartProducts));

//   this.calculateTotalPrice();
// }
// minsAmount(index: number): void {
//   this.cartProducts[index].amount--;
//   localStorage.setItem('cart', JSON.stringify(this.cartProducts));
//   if (this.cartProducts[index].amount <= 0) {
//     this.cartProducts[index].amount = 1;
//   }
//   this.calculateTotalPrice();
// }

// deleteProduct(index: number): void {
//   this.cartProducts.splice(index, 1);
//   localStorage.setItem('cart', JSON.stringify(this.cartProducts));
//   this.calculateTotalPrice();
// }

// clearCart(): void {
//   this.cartProducts = [];
//   localStorage.removeItem('cart');
//   this.calculateTotalPrice();
// }

// addCart(): void {
//   let products = this.cartProducts.map((item) => {
//     return {
//       productId: item.product.id,
//       amount: item.amount,
//     };
//   });
//   let model = { userId: 1, date: new Date(), products: products };
//   this._crarService.addToCart(model).subscribe({
//     next: (res) => {
//       this.success = true;
//     },
//     error: (err) => {
//       console.log(err);
//     },
//     complete: () => {
//       console.log('complete');
//     },
//   });
// }
