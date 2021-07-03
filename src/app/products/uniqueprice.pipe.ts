import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'uniqueprice',
    pure: true
})

export class UniquePricePipe implements PipeTransform {
    transform(value: any): any {
        if (value !== undefined && value !== null) {
            return _.uniqBy(value, 'price');
        }
        return value;
    }
}