import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HeaderComponent } from './components/header/header.component';
import { SelectComponent } from './components/select/select.component';

@NgModule({
  declarations: [SpinnerComponent, HeaderComponent, SelectComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  exports: [
    SpinnerComponent,
    HeaderComponent,
    SelectComponent,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
