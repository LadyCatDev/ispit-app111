import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'uniquedeliverytime',
    pure: true
})

export class UniqueDeliveryTimePipe implements PipeTransform {
    transform(value: any): any {
        if (value !== undefined && value !== null) {
            return _.uniqBy(value, 'deliveryTime');
        }
        return value;
    }
}