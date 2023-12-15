import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity } from '../models/entity';
import { DocumentType } from '../models/document-type';
import { TaxpayerType } from '../models/taxpayer-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EntityService {

    url: string = 'http://localhost:8080/api/entities';

    constructor(private http: HttpClient) { }

    getEntities(): Observable<Entity[]> {
        return this.http.get<Entity[]>(this.url + '/list');
    }
    getDocumentsType(): Observable<DocumentType[]> {
        return this.http.get<DocumentType[]>(this.url + '/documents-type');
    }
    getTaxpayersType(): Observable<TaxpayerType[]> {
        return this.http.get<TaxpayerType[]>(this.url + '/type-taxpayers');
    }
    addEntity(entity: Entity): Observable<Entity> {
        return this.http.post<Entity>(this.url + '/add', entity);
    }
    getEntity(id: number): Observable<Entity> {
        return this.http.get<Entity>(this.url + '/' + id);
    }
    updateEntity(entity: Entity): Observable<Entity> {
        return this.http.put<Entity>(this.url + '/update/' + entity.id, entity);
    }
    deleteEntity(id: number): Observable<any> {
        return this.http.delete<any>(this.url + '/delete/' + id);
    }
}
