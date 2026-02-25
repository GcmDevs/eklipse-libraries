import { Validators } from '@angular/forms';
import { TAK_PTRN_EMAIL, TAK_PTRN_NONSP, TAK_PTRN_NUMRC } from './common';

export const required = Validators.required;

export const max = (max: number) => Validators.max(max);
export const min = (min: number) => Validators.min(min);

export const maxLength = (maxLength: number) => Validators.maxLength(maxLength);
export const minLength = (minLength: number) => Validators.minLength(minLength);

export const withOutSpaces = Validators.pattern(TAK_PTRN_NONSP);
export const onlyNumber = Validators.pattern(TAK_PTRN_NUMRC);
export const email = Validators.pattern(TAK_PTRN_EMAIL);
