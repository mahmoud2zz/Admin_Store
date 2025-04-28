import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products-service.service';
import { Product } from '../../model/product'; // Adjust the path as needed
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../model/category';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] | null = [];
  categories: Category[] | null = [];
  cartProducts: any[] = [];
  updatedProduct!: Product;
  idCategorySelected: number = 0;
  form!: FormGroup;
  isLoading: boolean = false;
  base64String: any = '';

  constructor(
    private _productService: ProductsService,
    private _formBuilder: FormBuilder
  ) {
    this.form = this._formBuilder.group({
      id: [0],
      category: [''],
      title: ['', Validators.required],
      quantity: [0, Validators.required],
      decription: ['', Validators.required],
      price: [0, Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }
  onCategoryChange(event: any) {
    console.log('Selected category:', event.target.value);
    this.idCategorySelected =
      this.categories?.findIndex((c) => c.name === event.target.value) ?? -1;
    console.log('Selected category ID:', this.idCategorySelected);
  }

  getAllProducts() {
    console.log('Fetching all products...');
    this.isLoading = true;
    this._productService.geAlltProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        console.log('All products:', this.products);

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching all products:', error.message);

        this.isLoading = false;
      },
    });
  }
  getAllCategories() {
    this.isLoading = true;
    this._productService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
        console.log('All categories:', this.categories);

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching all categories:', error.message);
        alert(
          'An error occurred while fetching all categories. Please try again later.'
        );
        this.isLoading = false;
      },
    });
  }

  getProductsByCategory(category: string) {
    this.isLoading = true;
    this._productService.getProductsByCategory(category).subscribe({
      next: (response) => {
        this.products = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products by category:', error.message);
        alert(
          'An error occurred while fetching products by category. Please try again later.'
        );
        this.isLoading = false;
      },
    });
  }

  // reciveCategory(event: any) {
  //   let value = event.target.value;

  //   value === 'all' ? this.getAllProducts() : this.getProductsByCategory(value);
  // }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onload = () => {
        this.base64String = reader.result as string;
        console.log('Base64 String:', this.base64String);
        this.form.patchValue({
          image: this.base64String,
        });
      };
      reader.onerror = (error) => {
        console.error('Error converting to base64:', error);
      };
    }
  }

  addProduct(): void {
    const product: Product = this.form.value as Product;

    product.categoryId = this.idCategorySelected;
    this._productService.addProduct(product).subscribe({
      next: (response) => {
        alert('Product added successfully');
        this.form.reset();
        this.getAllProducts();
      },
      error: (error) => {
        console.error('Error adding product:', error.message);
        alert(
          'An error occurred while adding the product. Please try again later.'
        );
      },
    });
  }

  updateProduct(product: Product): void {
    this.form.get('id')?.setValue(product.id);
    this.form.get('categoryId')?.setValue(product.categoryId);

    this.form.get('title')?.setValue(product.title);
    this.form
      .get('decription')
      ?.setValue(product.decription ?? product.decription ?? '');
    this.form.get('price')?.setValue(product.price);
    this.form.get('quantity')?.setValue(product.quantity);
    this.form.get('image')?.setValue(product.image);

    console.log('Updating product:', product);
    console.log('Product to update:', this.form.value);
  }

  updateProductData(): void {
    const product = this.form.value as Product;
    this._productService.updateProduct(product.id, product).subscribe({
      next: (response) => {
        alert('Product updated successfully');
        this.form.reset();
        this.getAllProducts();
      },
      error: (error) => {
        console.error('Error updating product:', error.message);
        alert(
          'An error occurred while updating the product. Please try again later.'
        );
      },
    });
  }
}
