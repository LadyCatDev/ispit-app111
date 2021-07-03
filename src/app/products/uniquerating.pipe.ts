import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'uniquerating',
    pure: true
})

export class UniqueRatingPipe implements PipeTransform {
    transform(value: any): any {
        if (value !== undefined && value !== null) {
            return _.uniqBy(value, 'rating');
        }
        return value;
    }
}