import { Component, OnInit, ViewChild } from '@angular/core';
import { TaxpayerType } from 'src/app/models/taxpayer-type';
import { TaxpayerTypeService } from '../../services/taxpayer-type.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { Entity } from 'src/app/models/entity';

@Component({
  selector: 'app-taxpayers-type',
  standalone: true,
  templateUrl: './taxpayers-type.component.html',
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
export class TipoContribuyentesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'status', 'actions'];
  dataSource = new MatTableDataSource<TaxpayerType>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  taxpayerType: TaxpayerType[] = [];
  entities: Entity[] = [];

  constructor(private taxpayerTypeService: TaxpayerTypeService) { }

  ngOnInit(): void {
    this.listEntities();
    this.listTaxpayersTypes();
  }

  listTaxpayersTypes() {
    this.taxpayerTypeService.getListTaxpayersTypes()
    .subscribe(response => {
      this.dataSource.data = response;
    });
  }

  listEntities() {
    return this.taxpayerTypeService.getEntities()
    .subscribe(response => {
      this.entities = response;
    });
  }

  deleteTaxpayerType(id: number) {

    const idsTaxpayersTypesAssociatedWithEntity = this.entities.map((ent) => ent.tipo_contribuyente.id);

    Swal.fire({
      title: '¿Esta seguro de eliminar este tipo de contribuyente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar'
    })
    .then((result) => {
      if (result.isConfirmed) {
        if (idsTaxpayersTypesAssociatedWithEntity.includes(id)) {
          Swal.fire(
            'Error!',
            'No se puede eliminar este tipo de contribuyente porque ya se encuentra asociado a una entidad.',
            'error'
          )
          return;
        }
        this.taxpayerTypeService.deleteTaxpayerType(id).subscribe(
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
          'El tipo de contribuyente ha sido eliminado.',
          'success'
        )
      }
    })
  }
}
