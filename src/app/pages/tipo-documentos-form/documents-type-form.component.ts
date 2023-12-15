import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentType } from 'src/app/models/document-type';
import { DocumentTypeService } from '../../services/document-type.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-tipo-documentos-form',
    standalone: true,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    imports: [
        FormsModule,
        CommonModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    templateUrl: './documents-type-form.component.html',
})

export class TipoDocumentoFormComponent implements OnInit {
    tipoDocumento: DocumentType = new DocumentType();
    tipoDocumentos: DocumentType[] = [];

    constructor( private snack:MatSnackBar, private tipoDocumentoService: DocumentTypeService, private activatedRoute: ActivatedRoute, private router: Router ) { }
    ngOnInit(): void {
        this.simulateClick();
        this.listarTipoDocumentos();
        this.activatedRoute.params.subscribe(params => {
            let id: number = params['id'];
            if (id) {
                this.tipoDocumentoService.obtenerTipoDocumento(id)
                    .subscribe(response => this.tipoDocumento = response);
            }
        })
    }

    listarTipoDocumentos() {
        return this.tipoDocumentoService.getListarTipoDocumentos()
        .subscribe(response => {
            this.tipoDocumentos = response;
        });
    }

    crearTipoDocumento() {
        const codeDocumentWithoutSpaces = this.tipoDocumento.codigo?.trim().toUpperCase();
        const nameDocumentWithoutSpaces = this.tipoDocumento.nombre?.trim().toUpperCase();
        const arrayDocumentTypeCodes = this.tipoDocumentos.map((td) => td.codigo);
        const arrayDocumentTypeNames = this.tipoDocumentos.map((td) => td.nombre);

        if ( arrayDocumentTypeCodes.includes(codeDocumentWithoutSpaces) ) {
            this.snack.open('El tipo de documento ya existe', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            })
            return;
        }

        if ( codeDocumentWithoutSpaces == '' || codeDocumentWithoutSpaces == null || codeDocumentWithoutSpaces == undefined ) {
            this.snack.open('El codigo del tipo de documento es requerido !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        if ( nameDocumentWithoutSpaces == '' || nameDocumentWithoutSpaces == null || nameDocumentWithoutSpaces == undefined ) {
            this.snack.open('El nombre del tipo de documento es requerido !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        if ( arrayDocumentTypeNames.includes(nameDocumentWithoutSpaces) ) {
            this.snack.open('Ya existe un tipo de documento con este nombre', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            })
            return;
        }

        if ( this.tipoDocumento.estado == '' || this.tipoDocumento.estado == null || this.tipoDocumento.estado == undefined ) {
            this.snack.open('El estado del tipo de documento es requerido !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        this.tipoDocumentoService.crearTipoDocumento(this.tipoDocumento).subscribe(
            (data: any) => {
                Swal.fire('Tipo de documento creado', 'Tipo de documento creado con exito', 'success');
                this.router.navigate(['lista-tipo-documento']);
            },(error) => {
                console.log(error);
                this.snack.open('Ha ocurrido un error en el sistema, porfavor revise datos ingresados !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
                });
            }
        )
    }

    actualizarTipoDocumento() {
        const nameDocumentWithoutSpaces = this.tipoDocumento.nombre?.trim().toUpperCase();

        if ( nameDocumentWithoutSpaces == '' || nameDocumentWithoutSpaces == null || nameDocumentWithoutSpaces == undefined ) {
            this.snack.open('El nombre del tipo de documento es requerido !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        this.tipoDocumentoService.actualizarTipoDocumento(this.tipoDocumento).subscribe(
            (data: any) => {
                Swal.fire('Tipo de documento actualizado', 'Tipo de documento actualizado con exito', 'success');
                this.router.navigate(['lista-tipo-documento']);
            },(error) => {
                console.log(error);
                this.snack.open('Ha ocurrido un error en el sistema, porfavor revise datos ingresados !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
                });
            }
        )
    }

    simulateClick(): void {
      document.querySelector('button')?.click();
      setTimeout(() => {
        document.querySelector('button')?.click();
      }, 1)
    }
}
