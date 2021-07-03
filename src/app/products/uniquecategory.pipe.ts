import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'uniquecategory',
    pure: true
})

export class UniqueCategoryPipe implements PipeTransform {
    transform(value: any): any {
        if (value !== undefined && value !== null) {
            return _.uniqBy(value, 'category');
        }
        return value;
    }
}