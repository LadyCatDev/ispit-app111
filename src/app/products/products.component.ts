import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { Observable } from 'rxjs';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { Product, ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  name: string;
  searchText: string = "";
  selected_count: number = 0;
  productOpened: boolean = false;

  productSource = new MatTableDataSource<Product>(this.productService.filteredProducts);
  static cartTotal: number;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  obs: Observable<any>;

  constructor(private productService: ProductService,private dialog: MatDialog, public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.productSource.data = this.productService.getProducts();
  }

  ngAfterViewInit(): void {
    this.productSource.paginator = this.paginator;
    this.productSource.sort = this.sort;
    this.obs = this.productSource.connect();
  }

  doFilter(filterValue: string): void {
    this.productSource.filter = filterValue.trim().toLowerCase();

  }

  ngOnDestroy(): void {
    if (this.productSource) {
      this.productSource.disconnect();
    }
  }

  //Dodavanje proizvoda u omiljene
  addToFavourites(product: any): void {
    product.isAdded = !product.isAdded;
    if (product.isAdded) {
      this.productService.favouriteList.push(product);
    }
    else {
      var prodIndex = this.productService.favouriteList.indexOf(product);
      if (prodIndex > -1) {
        this.productService.favouriteList.splice(prodIndex, 1);
      }
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
        guaranty: product.guaranty,
        carModel: product.carModel,
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
    alert("Proizvod je uspešno dodat u korpu!");
  }

  //Ocena pojedinačnog proizvoda
  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }, product: Product): void {

    //Računanje ukupne sume kao proizvod postojeće ocene pojedinačnog proizvoda i postojećeg broja korisnika
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

  deleteProduct(product: Product): void {
    var prodIndex = this.productService.dummyProductList.indexOf(product);
    if (prodIndex > -1 && confirm("Da li ste sigurni da želite da obrišete ovaj proizvod?")) {
      this.productService.dummyProductList.splice(prodIndex, 1);
    }
  }

  editProduct(productId: number): void {
    this.productService.currentProduct = this.productService.dummyProductList.find(product => (product.id == productId));
    this.productOpened = true;

    const profileDialog = this.dialog.open(ProductEditComponent, {
      disableClose: false,
      width: "35vw",
      data: { product: this.productService.getProductById(productId) }
    });

    profileDialog.afterClosed().subscribe(result => {
      this.productOpened = false;
    })
  }

  onSubmit(form: NgForm): void {
    this.productService.filteredProducts = this.productService.filterProducts(
      form.value.category,
      form.value.productType,
      form.value.price
    );
    this.router.navigate(['/searchP']);
  }
}
