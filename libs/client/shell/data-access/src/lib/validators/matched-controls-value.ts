import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validateMatchedControlsValue = (
  firstControlName: string,
  secondControlName: string
): ValidatorFn => {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const { value: firstControlValue } = formGroup.get(
      firstControlName
    ) as AbstractControl;
    const { value: secondControlValue } = formGroup.get(
      secondControlName
    ) as AbstractControl;
    return firstControlValue === secondControlValue
      ? null
      : {
          valueNotMatch: {
            firstControlValue,
            secondControlValue,
          },
        };
  };
};
