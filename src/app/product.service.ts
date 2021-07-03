import { Injectable } from "@angular/core";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: "karoserija" | "karoserija1" | "elektrika" |"akumulator1" | "akumulator" | "sijalice1" | "sijalice" | "trap" |  "trap1" |
            "pogon tockova" | "motor" | "motor1";
  carModel: string;
  productType: "original" | "zamenski";
  guaranty: number;
  availability: "Dostupno" | "Nedostupno";
  rating: number;
  numberOfPersonsRated: number;
  deliveryTime: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor() { }

  cartTotal: number;
  filteredProducts: Array<Product> = [];

  dummyProductList: Array<Product> = [
    {
      id: 1,
      name: "Karoserija",
      description: "Karoserija sa nosivim telom, zatvorena",
      price: 11200,
      category: "karoserija",
      carModel: "Honda",
      productType: "original",
      guaranty: 48,
      availability: "Dostupno",
      rating: 3.8,
      numberOfPersonsRated: 45,
      deliveryTime: 5,
      quantity: 1
    },
    {
      id: 2,
      name: "Sijalice",
      description: "LED sijalice sa velikim zivotnim vekom",
      price: 3000,
      category: "sijalice",
      carModel: "Ford",
      productType: "zamenski",
      guaranty: 12,
      availability: "Dostupno",
      rating: 4.5,
      numberOfPersonsRated: 84,
      deliveryTime: 3,
      quantity: 1
    },
    {
      id: 3,
      name: "Pumpa za gorivo",
      description: "Pumpa sa pritiskom od 3 bara sa tipom goriva:Benzin",
      price: 17500,
      category: "elektrika",
      carModel: "BMW",
      productType: "original",
      guaranty: 24,
      availability: "Dostupno",
      rating: 4.1,
      numberOfPersonsRated: 221,
      deliveryTime: 7,
      quantity: 1
    },
    {
      id: 4,
      name: "Akumulator",
      description: "Akumulator 12V 74Ah 750a",
      price: 3500,
      category: "akumulator",
      carModel: "Ford",
      productType: "original",
      guaranty: 48,
      availability: "Nedostupno",
      rating: 3.5,
      numberOfPersonsRated: 65,
      deliveryTime: 2,
      quantity: 1
    },
    {
      id: 5,
      name: "Trap",
      description: "OPTIMAL lezajevi tocka",
      price: 28000,
      category: "trap",
      carModel: "Audi",
      productType: "original",
      guaranty: 48,
      availability: "Dostupno",
      rating: 4.7,
      numberOfPersonsRated: 22,
      deliveryTime: 10,
      quantity: 1
    },
    {
      id: 6,
      name: "Pogon Tockova",
      description: "TROSTRANI LEŽAJ – KRST POLUOSOVINE",
      price: 35750,
      category: "pogon tockova",
      carModel: "Mercedes",
      productType: "original",
      guaranty: 48,
      availability: "Dostupno",
      rating: 4.3,
      numberOfPersonsRated: 11,
      deliveryTime: 14,
      quantity: 1
    },
    {
      id: 7,
      name: "Motor",
      description: "Glava motora sa ventilima",
      price: 1200,
      category: "motor",
      carModel: "Hyndai",
      productType: "zamenski",
      guaranty: 6,
      availability: "Dostupno",
      rating: 3.9,
      numberOfPersonsRated: 32,
      deliveryTime: 7,
      quantity: 1
    },
    {
      id: 8,
      name: "Trap1",
      description: "BILSTEIN amortizeri",
      price: 15000,
      category: "trap1",
      carModel: "Skoda",
      productType: "zamenski",
      guaranty: 48,
      availability: "Nedostupno",
      rating: 3.8,
      numberOfPersonsRated: 7,
      deliveryTime: 7,
      quantity: 1
    },
    {
      id: 9,
      name: "Sijalica1",
      description: "XENON af100AH",
      price: 7000,
      category: "sijalice1",
      carModel: "BMW",
      productType: "original",
      guaranty: 48,
      availability: "Dostupno",
      rating: 4.6,
      numberOfPersonsRated: 122,
      deliveryTime: 5,
      quantity: 1
    },
    {
    id: 10,
    name: "Akumulator1",
    description: "Akumulator 12V 65Ah s700az",
    price: 15000,
    category: "akumulator1",
    carModel: "Hyndai",
    productType: "original",
    guaranty: 48,
    availability: "Nedostupno",
    rating: 2.5,
    numberOfPersonsRated: 19,
    deliveryTime: 7,
    quantity: 1
  },
  {
  id: 11,
  name: "Karoserija1",
  description: "Karoserija sa polunosivim  delom, kombinovana karoserija",
  price: 15000,
  category: "karoserija1",
  carModel: "Audi",
  productType: "original",
  guaranty: 48,
  availability: "Dostupno",
  rating: 4.0,
  numberOfPersonsRated: 33,
  deliveryTime: 4,
  quantity: 1
},
{
  id: 12,
  name: "Motor1",
  description: "Zamajac motora ah2000F",
  price: 15000,
  category: "motor1",
  carModel: "Opel",
  productType: "zamenski",
  guaranty: 48,
  availability: "Dostupno",
  rating: 3.1,
  numberOfPersonsRated: 44,
  deliveryTime: 12,
  quantity: 1
}
  ];

  favouriteList: Array<Product> = [];
  cartList: Array<any> = [];


  currentProduct: Product = this.dummyProductList[0];

  //Uzima se ime proizvoda i njegova količina (br. komada) za prikaz sadržaja porudžbine u Orders komponenti
  getProductNameAndQuantity(list: Array<any>): string {
    var productNameArray: Array<string> = [];
    list.forEach(product => {
      productNameArray.push(product.name + " " + `(x${product.quantity})`);
    });
    return productNameArray.join(", ");
  }

  //Uzimanje svih proizvoda iz liste, koristi se kao izvor za prikaz podataka na početnoj stranici logovanog korisnika
  getProducts(): Product[] {
    return this.dummyProductList;
  }

  getProduct(productName: String): Product {
    this.currentProduct = this.dummyProductList.find(estateToFind => estateToFind.name == productName)!;
    return this.currentProduct;
  }

  getProductById(id: number): Product {
    var foundProduct: Product
    this.dummyProductList.forEach(rEstate => {
      if (rEstate.id == id) {
        foundProduct = rEstate;
      }
    });
    this.currentProduct = foundProduct;
    return foundProduct;
  }

   //Uzimanje proizvoda iz liste omiljenih, koristi se kao izvor za prikaz podataka na stranici omiljenih proizvoda logovanog korisnika
   getFavourites() {
    return this.favouriteList;
  }

  addProduct(id: number,
    name: string,
    description: string,
    price: number,
    category: "karoserija" | "karoserija1" | "elektrika" |"akumulator1" | "akumulator" | "sijalice1" | "sijalice" | "trap" |  "trap1" |
              "pogon tockova" | "motor" | "motor1",
    carModel: string,
    productType: "original" | "zamenski",
    guaranty: number,
    availability: "Dostupno" | "Nedostupno",
    rating: number,
    numberOfPersonsRated: number,
    deliveryTime: number,
    quantity: number): Product {

    var maxId: number = 0;
    this.dummyProductList.forEach(prod => {
      if (maxId < prod.id) {
        maxId = prod.id;
      }
    });

    var id = ++maxId;

    var product: Product = {
      id,
      name,
      description,
      price,
      category,
      carModel,
      productType,
      guaranty,
      availability,
      rating,
      numberOfPersonsRated,
      deliveryTime,
      quantity
    };

    this.dummyProductList.push(product);

    this.currentProduct = product;

    return product;
  }

  filterProducts(category: String, productType: String, price: number): Product[] {
    return this.dummyProductList.filter(function (element) {
      if (category && productType && price) {
        return element.category == category && element.productType == productType && element.price <= price;
      }
      else if (category && productType && !price) {
        return element.category == category && element.productType == productType;
      }
      else if (category && !productType && price) {
        return element.category == category && element.price <= price;
      }
      else if (category && !productType && !price) {
        return element.category == category;
      }
      else if (!category && productType && price) {
        return element.productType == productType && element.price <= price;
      }
      else if (!category && productType && !price) {
        return element.productType == productType;
      }
      else if (!category && !productType && price) {
        return element.price >= price && element.price <= price;
      }
      else if (!category && !productType && price) {
        return element.price <= price;
      }
      else {
        return [];
      }
    });
  }

}
