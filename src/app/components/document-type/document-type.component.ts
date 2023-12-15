import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentTypeService } from 'src/app/services/document-type.service';

import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { DocumentType } from '../../models/document-type';
import { Entity } from 'src/app/models/entity';



@Component({
  selector: 'app-document-type',
  standalone: true,
  templateUrl: './document-type.component.html',
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
})
export class DocumentTypeComponent implements OnInit {

  displayedColumns: string[] = ['code', 'description', 'status', 'name', 'actions'];
  dataSource = new MatTableDataSource<DocumentType>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  DocumentType: DocumentType[] = [];
  entities: Entity[] = [];

  constructor(private tipoDocumentoService: DocumentTypeService) { }

  ngOnInit(): void {
    this.listarEntidades();
    this.listarTipoDocumentos();
  }

  listarTipoDocumentos() {
    this.tipoDocumentoService.getListarTipoDocumentos()
    .subscribe(response => {
      this.dataSource.data = response;
    });
  }

  listarEntidades() {
    return this.tipoDocumentoService.getEntidades()
    .subscribe(response => {
      this.entities = response;
    });
  }

  eliminarTipoDocumento(id: number) {

    const idsDocumentsTypeAsociatedWithEntity = this.entities.map((ent) => ent.tipo_documento.id);

    Swal.fire({
      title: '¿Esta seguro de eliminar este tipo de documento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        if (idsDocumentsTypeAsociatedWithEntity.includes(id)) {
          Swal.fire(
            'Error!',
            'No se puede eliminar este tipo de documento porque ya se encuentra asociado a una entidad.',
            'error'
          )
          return;
        }
        this.tipoDocumentoService.eliminarTipoDocumento(id).subscribe(
          (data: any) => {
            const index = this.dataSource.data.findIndex((td) => td.id === id);
            if (index !== -1) {
              this.dataSource.data.splice(index, 1);
              this.dataSource._updateChangeSubscription();
            }
          }
        )
        Swal.fire(
          'Eliminado!',
          'El tipo de documento ha sido eliminado con exito.',
          'success'
        )
      }
    }, (error) => {
      console.log(error);

    })
  }
}
