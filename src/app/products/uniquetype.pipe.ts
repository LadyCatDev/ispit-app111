import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'uniquetype',
    pure: true
})

export class UniqueTypePipe implements PipeTransform {
    transform(value: any): any {
        if (value !== undefined && value !== null) {
            return _.uniqBy(value, 'productType');
        }
        return value;
    }
}
