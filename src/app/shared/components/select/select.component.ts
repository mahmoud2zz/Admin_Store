import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../products/model/category';

@Component({
  selector: 'app-select',
  standalone: false,
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent implements OnInit {
  @Input() title: string = '';
  @Input() items: Category[] | null = [];
  @Input() all: boolean = true;
  @Input() selected: string = '';
  @Output() selectedItem: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  detectChange(event: any) {
    this.selectedItem.emit(event);
  }
}
