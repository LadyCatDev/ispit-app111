import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../order.service';
import { ProductService } from '../product.service';
import { ProductsComponent } from '../products/products.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-orderconfirm',
  templateUrl: './orderconfirm.component.html',
  styleUrls: ['./orderconfirm.component.css']
})
export class OrderconfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public recievedData: any, public orderService: OrderService,
    public userService: UserService, public productService: ProductService) { }

  ngOnInit(): void {
  }

  //Kreiranje nove porudžbine koristeći atribute iz forme, lista elemenata u korpi, ocena porudžbine se inicijalizuje na nulu
  onSubmit(form: NgForm): void {
    this.orderService.addOrder([...this.productService.cartList],
      this.productService.getProductNameAndQuantity(this.productService.cartList),
      this.recievedData.deliveryTime,
      this.productService.cartTotal,
      form.value.address,
      "U toku",
      0);
  }


}
