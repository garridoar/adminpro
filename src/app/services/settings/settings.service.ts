import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // Setea por defecto el tema default-dark
  ajustes: Ajustes = {
    temaUrl: 'assets/css/color/default-dark.css',
    tema: 'default-dark'
  };

  element: Element;

  constructor(@Inject(DOCUMENT) private _document) { 
    this.cargarAjustes();
  }
  
  guardarAjustes() {
    // console.log('Guardado en el localStorage');
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));
  }

  cargarAjustes() {
    if( localStorage.getItem('ajustes') ) {
      // console.log('Cargando del localStorage');
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));

      this.aplicarTema( this.ajustes.tema );
    }
    else {
      // console.log('Usando valores por defecto');
      this.aplicarTema( this.ajustes.tema );
    }
  }

  aplicarTema( tema: string ) {
    const url = `assets/css/colors/${ tema }.css`
    this._document.getElementById('theme').setAttribute('href', url);

    this.ajustes.temaUrl = url;
    this.ajustes.tema = tema;
    this.guardarAjustes();
  }

}

// Yo lo crearía en un archivo aparte Ej: ajustes.model.ts
interface Ajustes {
  temaUrl: string;
  tema: string;
}