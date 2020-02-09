import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService,
               private router: Router ) { } 
 
  canActivate(): boolean {

    if( this._usuarioService.estaLogueado() ) {
      console.log('PASO EL GAURD');
      return true;
    }
    else {
      console.log('Bloqueado por el guard');
      this.router.navigateByUrl('login');
      return false;
    }
     
  }
  
}
