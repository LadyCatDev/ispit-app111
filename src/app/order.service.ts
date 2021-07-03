import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';

export interface Order {
  id: number;
  content: Array<any>;
  name: string;
  deliveryTime: number;
  totalPrice: number;
  address: string;
  status: 'Završena' | 'U toku' | 'Otkazana';
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  //Promenljiva u kojoj se smešta funkcija za završenu porudžbinu
  completedOrder: any;

  orderList: Array<Order> = [];

  constructor(public productService: ProductService, private router: Router) {
  }

  //Kreiranje nove porudžbine
  addOrder(content: Array<any>, name: string, deliveryTime: number, totalPrice: number, address: string, status: any, rating: number) {
    var maxId: number = 0;
    this.orderList.forEach(order => {
      if (maxId < order.id) {
        maxId = order.id;
      }
    });

    var id = ++maxId;

    var order: Order = { id, content, name, deliveryTime, totalPrice, address, status, rating };

    this.orderList.push(order);

    this.router.navigate(['/orders']);
    // Poziv funkcije kojom se porudžbina tretira kao završena nakon nasumičnog vremena
    if (order.status == "U toku") {
      this.completeOrder(order, this.productService.cartList);
    }
    return order;
  }

  getOrders(): Order[] {
    return this.orderList;
  }

  //Završetak porudžbine, nakon nasumičnog vremena porudžbina se tretira kao završena, 
  //dostavljeni elementi se brišu iz korpe
  completeOrder(order: Order, list: Array<any>): void {
    this.completedOrder = setTimeout(function () {
      list.length = 0;
      order.status = "Završena";
    }, (Math.random() * 5000) + 5000);
  }

  //Otkazivanje porudžbine
  cancelOrder(order: Order): void {
    order.status = "Otkazana";
    clearTimeout(this.completedOrder);
  }
}
