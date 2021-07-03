import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
//Posebna klasa paginacije sa lokalizacijom teksta
export class CustomMatPaginatorSrService extends MatPaginatorIntl {
  constructor() {
    super();

    this.getAndInitTranslations();
  }

  getAndInitTranslations() {

    this.itemsPerPageLabel = "Stavki po stranici";
    this.nextPageLabel = "Sledeća stranica";
    this.previousPageLabel = "Prethodna stranica";
    this.changes.next();

  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 od ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} od ${length}`;
  }
}
