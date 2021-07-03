import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from '../welcome/welcome.component';
import { SignupComponent } from '../signup/signup.component';
import { OrdersComponent } from '../orders/orders.component';
import { ProductsComponent } from '../products/products.component';
import { CartComponent } from '../cart/cart.component';
import { FavouritesComponent } from '../favourites/favourites.component';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { SearchProductsComponent } from '../search-products/search-products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'addProduct', component: AddproductComponent },
  { path: 'searchP', component: SearchProductsComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    CommonModule,
    RouterModule
  ]
})
export class RoutingModule { }
