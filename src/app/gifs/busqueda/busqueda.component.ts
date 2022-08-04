import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifService } from '../services/gif.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {
  /* El ! (not-null assertion operator) indica que el elemento no será null.
  El ElementRef<HTMLInputElement> indica que se trata de una referencia de un elemento input
  para acceder al value.
  */
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifService: GifService) {}

  buscar() {
    /* se accede al value */
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0) {
      return;
    }

    this.gifService.buscarGifs(valor);

    /* se limpia el input */
    this.txtBuscar.nativeElement.value = '';
  }
}
