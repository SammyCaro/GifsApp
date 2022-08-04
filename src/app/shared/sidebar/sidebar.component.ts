import { Component } from '@angular/core';
import { GifService } from '../../gifs/services/gif.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  get historial() {
    return this.gifService.historial;
  }

  constructor(private gifService: GifService) {}

  buscar(valor: string) {
    this.gifService.buscarGifs(valor);
    console.log(valor);
  }
}
