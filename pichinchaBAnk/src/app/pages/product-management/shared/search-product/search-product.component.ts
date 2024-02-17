import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  @Output() search = new EventEmitter<string>();
  searchTerm: string = '';

  onSearch() {
    this.search.emit(this.searchTerm.trim());
    console.log(this.searchTerm);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
