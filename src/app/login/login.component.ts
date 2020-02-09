import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function initPlugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  auth2: any;

  constructor( public router: Router,
               public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    initPlugins();
    // this.googleInit();

    let email = localStorage.getItem( 'emailRecuerdame' );

    if( email ) {
      this.email = email;
      this.recuerdame = true;
    }
    else {
      this.email = '';
    }

  }

  // googleInit() {

  //   gapi.load('auth2', () => {

  //     this.auth2 = gapi.auth2.init({
  //       client_id: '71072903223-vbocgv1b95ssvloqe7ku4e01od1aquot.apps.googleusercontent.com',
  //       cookiepolicy: 'single_host_origin',
  //       scope: 'profile email'
  //     });

  //     this.attachSignIn( document.getElementById('btnGoogle') );

  //   });
  // }


  attachSignIn( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      let profile = googleUser.getBasicaProfile();
      console.log(profile);
    });
  }


  ingresar( forma: NgForm ): void {

    if( forma.invalid ) {
      return;
    }

    const usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    this._usuarioService.login( usuario, forma.value.recuerdame )
      .subscribe( 
        (status) => this.router.navigateByUrl('/dashboard')
      );

  }
}
