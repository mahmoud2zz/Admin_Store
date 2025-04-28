import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { Product } from '../../products/model/product';
import { ApiResponse } from '../../shared/model/api-respones';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _httpCleint: HttpClient) {}

  getAllCarts(param?: any): Observable<ApiResponse<Cart[]>> {
    return this._httpCleint.get<ApiResponse<Cart[]>>(
      environment.baseUrl + '/carts',
      {}
    );
  }

  filterCarts(
    startDate: string,
    endDate: string
  ): Observable<ApiResponse<Cart[]>> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    console.log(params);
    return this._httpCleint.get<ApiResponse<Cart[]>>(
      `${environment.baseUrl}/carts/filter-cart`,
      {
        params,
      }
    );
  }

  addToCart(cart: any): Observable<any> {
    return this._httpCleint.post<any>(environment.baseUrl + '/carts', cart);
  }

  deleteCart(idCart: number): Observable<ApiResponse<Cart>> {
    return this._httpCleint.delete<ApiResponse<Cart>>(
      environment.baseUrl + '/carts/' + idCart
    );
  }

  getProudct(idProduct: number): Observable<Product> {
    console.log(idProduct);
    return this._httpCleint.get<Product>(
      'https://fakestoreapi.com/products/' + idProduct
    );
  }
}
