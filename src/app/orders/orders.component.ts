import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { Order, OrderService } from '../order.service';
import { OrderconfirmComponent } from '../orderconfirm/orderconfirm.component';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'name', 'status', 'deliveryTime', 'price', 'actions', 'rating'];
  orderSource = new MatTableDataSource<Order>();

  @ViewChild(MatSort) sort: MatSort;


  @ViewChild(StarRatingComponent) rating: StarRatingComponent;

  constructor(public orderService: OrderService, public userService: UserService, public productService: ProductService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.orderSource.data = this.orderService.getOrders();
  }

  ngAfterViewInit(): void {
    this.orderSource.sort = this.sort;
  }

  doFilter(filterValue: string): void {
    this.orderSource.filter = filterValue.trim().toLowerCase();
  }

  //Rutiranje ka korpi (kada se porudžbina otkaže, korisnik se vraća na korpu da izvrši dalje izmene u korpi ili poručivanju)
  toCart(): void {
    this.router.navigate(['/cart']);
  }

  //Ponovno poručivanje istih proizvoda
  reorder(order: Order): void {
    this.productService.cartList = [...order.content];
    const dialogRef = this.dialog.open(OrderconfirmComponent, {
      data: {
        deliveryTime: order.deliveryTime
      }
    });
    this.router.navigate(['/cart']);
  }

  //Ocena pojedinačne porudžbine
  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }, order: Order): void {
    order.rating = $event.newValue;
  }

  //Brisanje porudžbine iz evidencije
  deleteOrder(order: Order): void {
    var orderIndex = this.orderService.orderList.indexOf(order);
    this.orderService.orderList.splice(orderIndex, 1);
    this.ngOnInit();
  }

}
