import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product, ProductService } from '../product.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {

  constructor(private productService: ProductService) { }
  ngOnInit(): void {}
  

  productSource  = new MatTableDataSource<Product>(this.productService.filteredProducts);


}
