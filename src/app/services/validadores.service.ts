import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
 [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noHurtado( control: FormControl): {[s: string]: boolean}{

    if (control.value.toLowerCase() === 'hurtado'){
      return {
        noHurtado: true,
      };
    }else{
      return null;
    }
  }

  existeUsuario( control: FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate>{

    if ( !control.value ){
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strider'){
          resolve({ existe: true});
        }else{
          resolve(null);
        }

      }, 3500);
    });
  }

  passwordsIguales(password1: string, password2: string) {
    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.controls[password1];
      const pass2Control = formGroup.controls[password2];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({noEsIgual: true});
      }

    };
  }
}
