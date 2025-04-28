import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { ApiResponse } from '../../shared/model/api-respones';
import { Product } from '../../products/model/product'; // Ensure this path is correct
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}

  addProduct(product: any): Observable<any> {
    const formData = new FormData();
    formData.append('id', product.id.toString());
    formData.append('title', product.title);
    formData.append('decription', product.decription);
    formData.append('price', product.price.toString());
    formData.append('quantity', product.quantity.toString());
    formData.append('categoryId', product.categoryId.toString());
    console.log(formData);
    // Check if the image is valid (not null or undefined)
    if (product.image) {
      // Handle Base64 string
      if (
        typeof product.image === 'string' &&
        product.image.startsWith('data:image')
      ) {
        const byteString = atob(product.image.split(',')[1]); // Decode Base64 to raw binary
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          uintArray[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([uintArray], { type: 'image/jpeg' }); // Assuming it's JPEG, change if needed
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
        formData.append('image', file, 'image.jpg');
      } else if (product.image instanceof File) {
        // If it's a File object, append it directly
        formData.append('image', product.image);
      }
    } else {
      console.log('No image provided');
      // Optionally, append a placeholder image or skip appending the image field
    }
    return this._httpClient.post<any>(
      `${environment.baseUrl}/products`,
      formData
    );
  }

  geAlltProducts(): Observable<ApiResponse<Product[]>> {
    return this._httpClient.get<ApiResponse<Product[]>>(
      `${environment.baseUrl}/products`
    );
  }
  getAllCategories(): Observable<ApiResponse<Category[]>> {
    return this._httpClient.get<ApiResponse<Category[]>>(
      `${environment.baseUrl}/Categories`
    );
  }
  getProductsByCategory(category: string): Observable<any[]> {
    return this._httpClient.get<any[]>(
      `${environment.baseUrl}/products/category/${category}`
    );
  }
  getProductById(id: string): Observable<any> {
    return this._httpClient.get<any>(`${environment.baseUrl}/products/${id}`);
  }
  updateProduct(
    id: number,
    product: Product
  ): Observable<ApiResponse<Product>> {
    const formData = new FormData();
    formData.append('id', product.id.toString());
    formData.append('title', product.title);
    formData.append('decription', product.decription);
    formData.append('price', product.price.toString());
    formData.append('quantity', product.quantity.toString());
    formData.append('categoryId', product.categoryId.toString());
    console.log(formData);
    // Check if the image is valid (not null or undefined)
    if (product.image) {
      // Handle Base64 string
      if (
        typeof product.image === 'string' &&
        product.image.startsWith('data:image')
      ) {
        const byteString = atob(product.image.split(',')[1]); // Decode Base64 to raw binary
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          uintArray[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([uintArray], { type: 'image/jpeg' }); // Assuming it's JPEG, change if needed
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
        formData.append('image', file, 'image.jpg');
      } else if (product.image instanceof File) {
        // If it's a File object, append it directly
        formData.append('image', product.image);
      }
    } else {
      console.log('No image provided');
      // Optionally, append a placeholder image or skip appending the image field
    }
    // Check if the image is valid (not null or undefined)

    // if image is a File or base64 string

    return this._httpClient.put<ApiResponse<Product>>(
      `${environment.baseUrl}/products/${id}`,
      formData
    );
  }
}
