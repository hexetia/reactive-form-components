import { Capitalize } from 'capitalize-br';
export class FormatOnBlur {
    static capitalizeOnBlur(control) {
        control.patchValue(Capitalize(control.value), { emitEvent: true });
        if (control.onBlur !== undefined) {
            control.onBlur();
        }
        if (control.meta.onBlur !== undefined) {
            control.meta.onBlur();
        }
    }
}
//# sourceMappingURL=FormatOnBlur.js.map