import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  /* API EE GIFS */
  private apiKey: string = 'IVkojcXNX2qxXA0tr8N2gxHo461fE2Nl';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  /* array vacío para rescatar los datos */
  private _historial: string[] = [];
  /* array para mostrar resultado al cargar página */
  public resultados: Gif[] = [];

  /* para mostrar los datos*/
  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  /* guarda los datos en el array */
  buscarGifs(valor: string) {
    valor = valor.toLocaleLowerCase();

    /* Si no incluye un valor vacío, entonces guardalo y limita el array a 10 */
    if (!this._historial.includes(valor)) {
      this._historial.unshift(valor);
      this._historial = this._historial.splice(0, 10);

      /* SE GUARDA EN LOCALSTORAGE */
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    /* PETICIÓN A LA API */
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', valor);
    this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
