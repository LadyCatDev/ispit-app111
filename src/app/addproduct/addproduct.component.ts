import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  errorExists = false;
  errorText = "";

  constructor(private productService: ProductService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

/*
Komponenta za dodavanje proizvoda
Ime komponente: addProduct
Programer: Stojanka Tešanović
Verzija: 1.0 (28.06.2021.)

Ulazni parametri su: ime, opis, cena, kategorija, model automobila, dužina trajanja garancije,
dostupnost - da li je proizvod ostupan ili nije, ocena i količina koja se poručuje.

Izlazni parametri: Niz oglasa koji odgovaraju zadatim parametrima.
*/


  onSubmit(form: NgForm): void {

    if (!this.productService.getProduct(form.value.name)) {

      this.errorExists = false;

      this.productService.addProduct( form.value.id,
                                      form.value.name,
                                      form.value.description,
                                      form.value.price,
                                      form.value.category,
                                      form.value.carModel,
                                      form.value.productType,
                                      form.value.guaranty,
                                      form.value.availability,
                                      form.value.rating,
                                      form.value.numberOfPersonsRated,
                                      form.value.deliveryTime,
                                      form.value.quantity                                   
);

      sessionStorage.setItem("currentProduct", form.value.name);

      this.router.navigate(['/product']);
      console.log(this.productService.dummyProductList);

    } else {

      this.errorExists = true;

      this.errorText = "Deo sa zadatim imenom već postoji."

    }

  }

}
