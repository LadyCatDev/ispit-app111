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

    //Ako proizvod ve?? postoji u korpi, pove??ava se broj komada istog, i stavlja se da postoji u korpi
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

    //Stati??ka varijabla koja predstavlja ukupnu sumu svih proizvoda u korpi i inkrementira
    //sumu za svaki naredni komad proizvoda
    ProductsComponent.cartTotal = 0;
    //Suma ukupne cene svih proizvoda u korpi, sa njihovim koli??inama (br. komada)
    this.productService.cartList.forEach(item => {
      ProductsComponent.cartTotal += (item.quantity * item.price);
    });
    alert("Proizvod je uspe??no dodat u korpu!");
  }

  //Ocena pojedina??nog proizvoda
  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }, product: Product): void {

    //Ra??unanje ukupne sume kao proizvod postoje??e ocene pojedina??nog proizvoda i postoje??eg broja korisnika
    //koji su ocenili proizvod
    var ratingSum = product.rating * product.numberOfPersonsRated;

    //Suma se uve??ava za novu ocenu klikom na odgovaraju??u zvezdicu (uzimanje newValue varijable za doga??aj)
    ratingSum += $event.newValue;
    product.numberOfPersonsRated++;

    //Aritmeti??ka vrednost sume ocena i broja korisnika koji su dali ocenu se prosle??uje polju ocene za proizvod,
    //a samim tim i novoj vrednosti simboli??kog predstavljanja ocene (pomo??u zvezda)
    product.rating = parseFloat((ratingSum / product.numberOfPersonsRated).toFixed(2));
    $event.starRating.value = product.rating;
  }

  deleteProduct(product: Product): void {
    var prodIndex = this.productService.dummyProductList.indexOf(product);
    if (prodIndex > -1 && confirm("Da li ste sigurni da ??elite da obri??ete ovaj proizvod?")) {
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
