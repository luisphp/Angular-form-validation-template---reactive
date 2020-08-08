import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  nombre = '';
  paises: any[];

  usuario = {
    nombre: 'Luis O',
    apellido: 'Hurtado',
    email: 'oneill@gmail.com',
    pais: '',
    genero: ''
  };

  constructor(private servicio: PaisService) { }

  ngOnInit(): void {
    this.servicio.getPaises()
    .subscribe((data: any) =>  {
      console.log(data);
      this.paises = data;
      this.paises.unshift({pais: 'Seleccione un pais', codigo: ''});
    });
  }

  guardar(forma: NgForm): any {
    if (forma.invalid){
      Object.values(forma.controls).forEach( control => {
        control.markAsTouched();
      });
      return;
    } else {
      console.log(forma.form);
      console.log(forma.value);
    }
  }

}
