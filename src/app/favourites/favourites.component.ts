import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StarRatingComponent } from 'ng-starrating';
import { Product, ProductService } from '../product.service';
import { ProductsComponent } from '../products/products.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  productSource = new MatTableDataSource<Product>(this.productService.favouriteList);

  constructor(public productService: ProductService, public userService: UserService) { }

  ngOnInit(): void {
    this.productSource.data = this.productService.getFavourites();
  }

  //Uklanjanje proizvoda iz omiljenih
  removeFromFavourites(product: any): void {
    var prodIndex = this.productService.favouriteList.indexOf(product);
    if (prodIndex > -1) {
      this.productService.favouriteList.splice(prodIndex, 1);
      //Setovanje boolean-a za favourite klasu simbola za omiljeni proizvod na početnoj stranici
      //(kada proizvod više nije dodat u listu omiljenih)
      product.isAdded = !product.isAdded;
    }
  }


  //Dodavanje proizvoda u korpu
  addToCart(product: Product): void {
    let productExists = false;

    //Ako proizvod već postoji u korpi, povećava se broj komada istog, i stavlja se da postoji u korpi
    for (let i in this.productService.cartList) {
      if (this.productService.cartList[i].id === product.id) {
        this.productService.cartList[i].quantity++;
        productExists = true;
        break;
      }
    }

    //Ako proizvod ne postoji u korpi, dodaje se u listu sa najosnovnijim atributima
    if (!productExists) {
      this.productService.cartList.push({
        id: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        deliveryTime: product.deliveryTime
      });
    }

    //Statička varijabla koja predstavlja ukupnu sumu svih proizvoda u korpi i inkrementira
    //sumu za svaki naredni komad proizvoda
    ProductsComponent.cartTotal = 0;
    //Suma ukupne cene svih proizvoda u korpi, sa njihovim količinama (br. komada)
    this.productService.cartList.forEach(item => {
      ProductsComponent.cartTotal += (item.quantity * item.price);
    });
  }

  //Ocena pojedinačnog proizvoda
  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }, product: Product): void {

    //Računanje ukupne sume kao proizvod postojeće ocene pojedinačnog proizvoda sa postojećim brojem korisnika
    //koji su ocenili proizvod
    var ratingSum = product.rating * product.numberOfPersonsRated;

    //Suma se uvećava za novu ocenu klikom na odgovarajuću zvezdicu (uzimanje newValue varijable za događaj)
    ratingSum += $event.newValue;
    product.numberOfPersonsRated++;

    //Aritmetička vrednost sume ocena i broja korisnika koji su dali ocenu se prosleđuje polju ocene za proizvod,
    //a samim tim i novoj vrednosti simboličkog predstavljanja ocene (pomoću zvezda)
    product.rating = parseFloat((ratingSum / product.numberOfPersonsRated).toFixed(2));
    $event.starRating.value = product.rating;
  }
}

