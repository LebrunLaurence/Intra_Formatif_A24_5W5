import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function est10mots(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const comm = control.value;
    if (!comm) {
      return null;
    }
    
    const nbMots = comm.split(' ').length;

    const estValide = nbMots > 9;

    return estValide ? null : { est10mots: true };
  };
}