import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderconfirmComponent } from '../orderconfirm/orderconfirm.component';
import { Product, ProductService } from '../product.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  //Objektna varijabla koja kasnije poprima vrednost statičke iz Products komponente; 
  //označava ukupnu sumu proizvoda u korpi
  cartTotal: number;

  constructor(public productService: ProductService, private dialog: MatDialog) { }

  //Uzimanje vrednosti ukupne sume proizvoda u korpi iz statičke varijable i davanje objektnoj
  ngOnInit(): void {
    this.productService.cartTotal = ProductsComponent.cartTotal;
  }

  //Briše se pojedinačni komad proizvoda iz korpe, ukoliko postoji, i ukupna cena u korpi se umanjuje za isti komad
  deleteFromCart(product: Product): void {
    var prodIndex = this.productService.cartList.indexOf(product);
    if (prodIndex > -1) {
      product.quantity--
      if (product.quantity < 1) {
        this.productService.cartList.splice(prodIndex, 1);
      }
    }
    this.productService.cartTotal -= product.price;
  }

  //Brisanje svih elemenata iz korpe
  removeAll(): void {
    this.productService.cartList.length = 0;
    this.productService.cartTotal = 0;
  }

  //Pozivanje dijaloga za potvrdu porudžbine, sa mogućnošću izmene adrese isporuke i broja telefona korisnika
  onOrderConfirm(list: Array<any>): void {
    // Vreme potrebno za isporuku porudžbine se računa kao najveće vreme isporuke među pojedinačnim elementima u korpi
    var maxDeliveryTime = function () {
      var values = list.map(val => val.deliveryTime);
      var max = Math.max.apply(null, values);
      return max;
    };
    //Otvaranje dijaloga
    const dialogRef = this.dialog.open(OrderconfirmComponent, {
      data: {
        deliveryTime: maxDeliveryTime()
      }
    });
  }
}
