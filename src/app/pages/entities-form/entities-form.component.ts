import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Entity } from 'src/app/models/entity';
import { TaxpayerType } from 'src/app/models/taxpayer-type';
import { DocumentType } from 'src/app/models/document-type';
import { EntityService } from 'src/app/services/entity.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-entityes-form',
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	templateUrl: './entities-form.component.html',
	styleUrls: ['./entities-form.component.css'],
	imports: [
		FormsModule,
		CommonModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule
	],
})
export class EntitiesFormComponent implements OnInit {

	entity: Entity = new Entity();
	entities: Entity[] = [];
	documentsType: DocumentType[] = [];
	taxpayersType: TaxpayerType[] = [];

	constructor(private snack:MatSnackBar, private entityService: EntityService, private activatedRoute: ActivatedRoute, private router: Router) { }

	ngOnInit(): void {
		this.listEntities();
		this.entityService.getDocumentsType()
			.subscribe(response => this.documentsType = response);

		this.entityService.getTaxpayersType()
		.subscribe(response => this.taxpayersType = response);

		this.activatedRoute.params.subscribe(params => {
			let id: number = params['id'];
			if (id) {
				this.entityService.getEntity(id)
					.subscribe(response => this.entity = response);
			}
		})
    this.simulateClick();
}
    listEntities() {
        return this.entityService.getEntities()
        .subscribe(response => {
            this.entities = response;
        });
    }

    addEntity() {
        const businessNamesWithoutSpaces = this.entity.razon_social?.trim().toUpperCase();
        const numberDocumentWithoutSpaces = this.entity.nro_documento?.trim().toUpperCase();
        const numbersDocument = this.entities.map((ndoc) => ndoc.nro_documento);
        const businessNames = this.entities.map((rz) => rz.razon_social);

        if ( businessNamesWithoutSpaces == '' || businessNamesWithoutSpaces == null || businessNamesWithoutSpaces == undefined) {
            this.snack.open('La razón social es requerida !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        if ( businessNames.includes(this.entity.razon_social )) {
            this.snack.open('Ya existe una entity con esa razón social', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        if (numberDocumentWithoutSpaces == '' || numberDocumentWithoutSpaces == null || numberDocumentWithoutSpaces == undefined) {
            this.snack.open('El numero de documento es requerido !!', 'Aceptar', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right'
            });
            return;
        }

        if ( numbersDocument.includes(this.entity.nro_documento )) {
            this.snack.open('Ya existe una entity con ese número de documento', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        if ( numberDocumentWithoutSpaces.length < 8) {
            this.snack.open('El número de documento debe tener al menos 8 digitos y sin espacios en blanco', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        if (this.entity.estado == '' || this.entity.estado == null) {
            this.snack.open('El estado es requerido !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        if (this.entity.tipo_documento == undefined || this.entity.tipo_documento == null) {
            this.snack.open('El tipo de documento es requerido !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        if (this.entity.tipo_contribuyente == undefined || this.entity.tipo_contribuyente == null) {
            this.snack.open('El tipo de contribuyente es requerido !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            return;
        }

        this.entityService.addEntity(this.entity).subscribe(
            (data: any) => {
                Swal.fire('Entidad creada', 'Entidad creada con exito', 'success');
                this.router.navigate(['/entidades']);
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

    updateEntity() {
        const businessNamesWithoutSpaces = this.entity.razon_social?.trim().toUpperCase();
        const numberDocumentWithoutSpaces = this.entity.nro_documento?.trim().toUpperCase();

        if ( businessNamesWithoutSpaces == '' || businessNamesWithoutSpaces == null || businessNamesWithoutSpaces == undefined) {
            this.snack.open('La razón social es requerida !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000)

            return;
        }

        if (numberDocumentWithoutSpaces == '' || numberDocumentWithoutSpaces == null || numberDocumentWithoutSpaces == undefined) {
            this.snack.open('El numero de documento es requerido !!', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000)

            return;
        }

        if ( numberDocumentWithoutSpaces.length < 8) {
            this.snack.open('El número de documento debe tener al menos 8 digitos y sin espacios en blanco', 'Aceptar', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000)

            return;
        }

        this.entityService.updateEntity(this.entity).subscribe(
            (data: any) => {
                Swal.fire('Entidad actualizada', 'Entidad actualizada con exito', 'success');
                this.router.navigate(['/entidades']);
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

    compararTipoDocumento( o1: DocumentType, o2: DocumentType ): boolean {
        if (o1 === undefined && o2 === undefined) return true;
        return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id
    }

    compararTipoContribuyente( o1: TaxpayerType, o2: TaxpayerType ): boolean {
        if (o1 === undefined && o2 === undefined) return true;
        return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id
    }

    simulateClick(): void {
      document.querySelector('button')?.click();
      setTimeout(() => {
        document.querySelector('button')?.click();
      }, 1)
    }
}
