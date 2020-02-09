import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import  Swal  from 'sweetalert2';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';


declare function initPlugins();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor( public _usuarioService: UsuarioService,
               public router: Router ) { }

  ngOnInit() {
    initPlugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales( 'password', 'password2' ) });
  }

  sonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };
  }

  registrarUsuario() {

    if( this.forma.invalid ) {
      return;
    }

    if( !this.forma.value.condiciones ) {
      Swal.fire({
        text: 'Debe aceptar los Términos y Condiciones',
        icon: 'error'
      })
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario( usuario )
        .subscribe( resp => this.router.navigateByUrl('/login'));
  }

}
