import { Validators } from '@angular/forms';

export const PATTERN_EMAIL = '^[^@]+@[^@]+.[a-zA-Z]{2,}$';
export const PATTERN_NUMERIC = /^[0-9.]+$/;
export const PATTERN_OUT_SPACES = /^[^\s]+$/;

export const required = Validators.required;

export const max = (max: number) => Validators.max(max);
export const min = (min: number) => Validators.min(min);

export const maxLength = (maxLength: number) => Validators.maxLength(maxLength);
export const minLength = (minLength: number) => Validators.minLength(minLength);

export const withOutSpaces = Validators.pattern(PATTERN_OUT_SPACES);
export const onlyNumber = Validators.pattern(PATTERN_NUMERIC);
export const email = Validators.pattern(PATTERN_EMAIL);
