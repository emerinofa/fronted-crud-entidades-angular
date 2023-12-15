import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Entity } from 'src/app/models/entity';
import { EntityService } from 'src/app/services/entity.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entities',
  standalone: true,
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css'],
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ]
})
export class EntitiesComponent implements OnInit {

  displayedColumns: string[] = ['tradeName', 'businessName', 'documentNumber', 'direction', 'status', 'documentType', 'taxpayerType', 'actions'];
  dataSource = new MatTableDataSource<Entity>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  entityes: Entity[] = [];

  constructor(private entityService: EntityService) { }

  ngOnInit(): void {
    this.listEntities();
  }

  listEntities() {
    this.entityService.getEntities()
    .subscribe(response => {
      this.dataSource.data = response;
    });
  }

  deleteEntity(id: number) {

    Swal.fire({
      title: '¿Esta seguro de eliminar esta entity?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar'
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.entityService.deleteEntity(id).subscribe(
          (data: any) => {
            const index = this.dataSource.data.findIndex((entity) => entity.id === id);
            if (index !== -1) {
              this.dataSource.data.splice(index, 1);
              this.dataSource._updateChangeSubscription();
            }
          }
        )
        Swal.fire(
          'Eliminado!',
          'La entity ha sido eliminada con exito.',
          'success'
        )
      }
    })
  }
}
