import { FormControl } from 'react-reactive-form';
import { Capitalize } from 'capitalize-br';

export class FormatOnBlur {
    static capitalizeOnBlur(control: FormControl): void {
        control.patchValue(Capitalize(control.value as string), { emitEvent: true });
        if (control.onBlur !== undefined) {
            control.onBlur();
        }

        if (control.meta.onBlur !== undefined) {
            control.meta.onBlur();
        }
    }
}
