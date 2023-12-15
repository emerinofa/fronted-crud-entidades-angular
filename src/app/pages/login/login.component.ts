import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-login',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
    ],
})

export class LoginComponent implements OnInit {

    loginData = {
        "username": "",
        "password": ""
    }

    constructor(private snack:MatSnackBar, private loginService:LoginService) { }

    ngOnInit(): void {

    }

    formSubmit() {
        if( this.loginData.username.trim() == '' || this.loginData.username == null ) {
            this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        if ( this.loginData.password.trim() == '' || this.loginData.password == null ) {
            this.snack.open('La contraseña es requerida !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        this.loginService.generateToken(this.loginData).subscribe(
            (data: any) => {
                this.loginService.loginUser(data.token);
                this.loginService.getCurrentUser().subscribe(
                    ( user: any ) => {
                        this.loginService.setUser( user );
                        console.log(user);
                        if ( this.loginService.getUserRole() == 'ADMIN' ) {
                        // admin dashboard
                            window.location.href = '/entidades';
                        } else if( this.loginService.getUserRole() == 'NORMAL' ) {
                        // formulario de lista de entidades
                            window.location.href = '/entidades';
                        } else {
                            this.loginService.logout();
                        }
                    }
                )
            },( error ) => {
                console.log( error );
                this.snack.open('Credenciales incorrectas !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
                })
            }
        )
  }
}
