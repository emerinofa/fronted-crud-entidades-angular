import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-signup',
    standalone: true,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    imports: [
        CommonModule,
        SignupComponent,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
    ],
    templateUrl: './signup.component.html',
    template: `<p>signup works!</p>`,
    styleUrls: ['./signup.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
    usuario: Usuario = new Usuario();

    constructor( private userService: UserService, private snack: MatSnackBar ) { }

    ngOnInit(): void {
    }
    crearUsuario() {
        if ( this.usuario.username == '' || this.usuario.username == null ) {
            this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }
        this.userService.agregarUsuario(this.usuario).subscribe(
            ( data: any ) => {
                console.log(data);
                Swal.fire('Usuario creado', 'Usuario creado con exito', 'success');
            },( error ) => {
                console.log( error );
                this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
                });
            }
        )
    }
}
