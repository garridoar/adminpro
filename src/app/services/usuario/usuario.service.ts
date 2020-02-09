import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    private router: Router
  ) {
    console.log('Servicio de usuario listo');
    this.cargarStorage();
  }


  estaLogueado(): boolean {
    return this.token.length > 5;
  }


  private cargarStorage(): void {
    if( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
    else {
      this.token = '';
      this.usuario = null;
    }
  }


  login( usuario: Usuario, recuerdame: boolean = false ): Observable<any> {

    if( recuerdame ) {
      localStorage.setItem('emailRecuerdame', usuario.email);
    }
    else {
      localStorage.removeItem('emailRecuerdame');
    }

    const url = `${URL_SERVICIOS}/login`;
    return this.http.post( url, usuario )
      .pipe(
        map( (resp: any) => {
          localStorage.setItem('id', resp.id);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('usuario', JSON.stringify(resp.usuario));
          this.usuario = resp.usuario;
          this.token = resp.token;
          return true;
        })
      );
  }


  logout(): void {

    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigateByUrl('/login');

  }


  crearUsuario(usuario: Usuario): Observable<any> {

    const url = `${URL_SERVICIOS}/usuario`;

    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          Swal.fire({
            text: 'Usuario creado correctamente',
            icon: 'success'
          })
          return resp.usuario;
        })
      );

  }

}
