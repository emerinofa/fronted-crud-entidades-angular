import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity } from '../models/entity';
import { DocumentType } from '../models/document-type';
import { TaxpayerType } from '../models/taxpayer-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DocumentTypeService {

    url: string = 'http://localhost:8080/api/documents-type';

    constructor(private http: HttpClient) { }

    getTipoDocumentos(): Observable<DocumentType[]> {
        return this.http.get<DocumentType[]>(this.url + '/listar');
    }
    getListarTipoDocumentos(): Observable<DocumentType[]> {
        return this.http.get<DocumentType[]>(this.url + '/list-type-documents');
    }
    getTipoContribuyentes(): Observable<TaxpayerType[]> {
        return this.http.get<TaxpayerType[]>(this.url + '/tipo-contribuyentes');
    }
    crearEntidad(entidad: Entity): Observable<Entity> {
        return this.http.post<Entity>(this.url + '/add', entidad);
    }
    crearTipoDocumento(tipoDocumento: DocumentType): Observable<DocumentType> {
        return this.http.post<DocumentType>(this.url + '/add-document-type', tipoDocumento);
    }
    obtenerEntidad(id: number): Observable<Entity> {
        return this.http.get<Entity>(this.url + '/' + id);
    }
    getEntidades(): Observable<Entity[]> {
        return this.http.get<Entity[]>(this.url + '/list');
    }
    obtenerTipoDocumento(id: number): Observable<DocumentType> {
        return this.http.get<DocumentType>(this.url + '/' + id);
    }
    actualizarEntidad(entidad: Entity): Observable<Entity> {
        return this.http.put<Entity>(this.url + '/update/' + entidad.id, entidad);
    }
    actualizarTipoDocumento(TipoDocumento: DocumentType): Observable<DocumentType> {
        return this.http.put<DocumentType>(this.url + '/update-document-type/' + TipoDocumento.id, TipoDocumento);
    }
    eliminarEntidad(id: number): Observable<any> {
        return this.http.delete<any>(this.url + '/delete/' + id);
    }
    eliminarTipoDocumento(id: number): Observable<any> {
        return this.http.delete<any>(this.url + '/delete-document-type/' + id);
    }
}
