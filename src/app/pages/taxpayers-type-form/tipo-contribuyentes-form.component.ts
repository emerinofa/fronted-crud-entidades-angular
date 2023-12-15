import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxpayerType } from 'src/app/models/taxpayer-type';
import { TaxpayerTypeService } from '../../services/taxpayer-type.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-tipo-contribuyentes-form',
    standalone: true,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    templateUrl: './taxpayers-type-form.component.html',
    imports: [
        FormsModule,
        CommonModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule
    ]
})
export class TipoContribuyenteFormComponent implements OnInit {

    tipoContribuyente: TaxpayerType = new TaxpayerType();
    tipoContribuyentes: TaxpayerType[] = [];

    constructor( private snack:MatSnackBar, private taxpayerTypeService: TaxpayerTypeService, private activatedRoute: ActivatedRoute, private router: Router ) { }

    ngOnInit(): void {
        this.simulateClick();
        this.listTaxpayersTypes();
        this.activatedRoute.params.subscribe(params => {
            let id: number = params['id'];
            if (id) {
                this.taxpayerTypeService.getTaxpayerType(id)
                    .subscribe(response => this.tipoContribuyente = response);
            }
        })
    }

    listTaxpayersTypes() {
        return this.taxpayerTypeService.getListTaxpayersTypes()
        .subscribe(response => {
            this.tipoContribuyentes = response;
        });
    }

    addTaxpayerType() {
        const nameTaxpayerTypesWithoutSpaces = this.tipoContribuyente.nombre?.trim().toUpperCase();
        const namesTaxpayerTypes = this.tipoContribuyentes.map((name) => name.nombre);

        if ( namesTaxpayerTypes.includes(nameTaxpayerTypesWithoutSpaces.toUpperCase()) ) {
            this.snack.open('El tipo de contribuyente ya existe', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        if ( nameTaxpayerTypesWithoutSpaces == '' || nameTaxpayerTypesWithoutSpaces == null || nameTaxpayerTypesWithoutSpaces == undefined ) {
            this.snack.open('El nombre es requerido !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        if ( this.tipoContribuyente.estado == '' || this.tipoContribuyente.estado == null ) {
            this.snack.open('El estado es requerido !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        this.taxpayerTypeService.addTaxpayerType(this.tipoContribuyente).subscribe(
            ( data: any ) => {
                Swal.fire('Tipo de conribuyente creado', 'Tipo de contribuyente creado con exito', 'success');
                this.router.navigate(['lista-tipo-contribuyente']);
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

    updateTaxpayerType() {
        if ( this.tipoContribuyente.nombre == '' || this.tipoContribuyente.nombre == null ) {
            this.snack.open('El nombre es requerido !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        this.taxpayerTypeService.updateTaxpayerType(this.tipoContribuyente).subscribe(
            ( data: any ) => {
                Swal.fire('Tipo de conribuyente actualizado', 'Tipo de contribuyente actualizado con exito', 'success');
                this.router.navigate(['lista-tipo-contribuyente']);
            },( error ) => {
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
