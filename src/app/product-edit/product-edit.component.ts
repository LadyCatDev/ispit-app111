import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product, ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productForEditing: Product;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public productService: ProductService, public userService: UserService) { }


  ngOnInit(): void {
    this.productForEditing = {
      id: this.data.product.id,
      name: this.data.product.name,
      description: this.data.product.description,
      price: this.data.product.price,
      category: this.data.product.category,
      carModel: this.data.product.carModel,
      productType: this.data.product.productType,
      guaranty: this.data.product.guaranty,
      availability: this.data.product.availability,
      rating: this.data.product.rating,
      numberOfPersonsRated: this.data.product.numberOfPersonsRated,
      deliveryTime: this.data.product.deliveryTime,
      quantity: this.data.product.quantity
    };
  }

  finishEditing(): void {
    this.data.product.id = this.productForEditing.id;
    this.data.product.name = this.productForEditing.name;
    this.data.product.description = this.productForEditing.description;
    this.data.product.price = this.productForEditing.price;
    this.data.product.category = this.productForEditing.category;
    this.data.product.carModel = this.productForEditing.carModel;
    this.data.product.productType = this.productForEditing.productType;
    this.data.product.guaranty = this.productForEditing.guaranty;
    this.data.product.availability = this.productForEditing.availability;
    this.data.product.deliveryTime = this.productForEditing.deliveryTime;
  }

}
