import { Validators } from '@angular/forms';

export const signInUserValidators = [Validators.required];
export const signInPasswordValidators = [Validators.required];
export const userValidator = Validators.compose([
  Validators.required
]);
export const passwordValidator = Validators.compose([
  Validators.required
]);
