import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder, private validador: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataAlForm();
    this.crearListeners();
   }

  ngOnInit(): void {
  }

  get nombreNoValido(): boolean{
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get emailNoValido(): boolean{
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }
  get usuarioNoValido(): boolean {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }
  get apellidoNoValido(): boolean{
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  get distritoNoValido(): boolean{
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }
  get ciudadNoValido(): boolean{
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  get pasatiempos(): FormArray {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get pass1NoValido(): boolean {
    return this.forma.get('password1').invalid && this.forma.get('password1').touched;
  }
  get pass2NoValido(): boolean {
    const pas1 = this.forma.get('password1').value;
    const pas2 = this.forma.get('password2').value;
    return pas1 === pas2;
  }

  crearFormulario(): void{
    this.forma = this.fb.group({
      nombre   : ['', [Validators.required, Validators.minLength(5)]],
      apellido : ['', [Validators.required, this.validador.noHurtado]],
      email    : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario  : ['', , this.validador.existeUsuario],
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([
      ])
    }, {
      validators: this.validador.passwordsIguales('password1', 'password2')
    });
  }

  crearListeners(): any{
    this.forma.valueChanges.subscribe( valor => {
      console.log(valor);
    });
    this.forma.statusChanges.subscribe( status => {
      console.log(status);
    });
  }

  addPasatiempo(): void {
    this.pasatiempos.push(this.fb.control('Nuevo Elemento', Validators.required));
  }
  removePasatiempo(i: number): void {
    this.pasatiempos.removeAt(i);
  }

  cargarDataAlForm(): any {
    this.forma.setValue({
      nombre: 'Luis H',
      apellido: 'Hurtado Vi',
      email: 'luis@gmail.com',
      usuario: '',
      password1: '123',
      password2: '123',
      direccion: {
        distrito: '12341212',
        ciudad: 'Caracas'
      },
      pasatiempos: [],
    });
  }



  guardar(): any {
    if (this.forma.invalid){
      return Object.values(this.forma.controls).forEach( control => {
        if ( control instanceof FormGroup){
          Object.values(control.controls).forEach( control =>  control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.forma.reset();
  }
}
