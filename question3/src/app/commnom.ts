import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function contientNom(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const comm = control.get('commentaire');
    const nom = control.get('nom');
    if (!comm || !nom) {
      return null;
    }

    const estValide = !comm.value.includes(nom.value);

    return estValide ? null : { contientNom: true };
  };
}