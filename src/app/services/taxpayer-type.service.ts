import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaxpayerType } from '../models/taxpayer-type';
import { HttpClient } from '@angular/common/http';
import { Entity } from '../models/entity';

@Injectable({
    providedIn: 'root'
})
export class TaxpayerTypeService {
    url: string = 'http://localhost:8080/api/type-taxpayers';

    constructor(private http: HttpClient) { }
    getListTaxpayersTypes(): Observable<TaxpayerType[]> {
        return this.http.get<TaxpayerType[]>(this.url + '/list-type-taxpayers');
    }
    addTaxpayerType(taxpayerType: TaxpayerType): Observable<TaxpayerType> {
        return this.http.post<TaxpayerType>(this.url + '/add-taxpayer-type', taxpayerType)
    }
    getTaxpayerType(id: number): Observable<TaxpayerType> {
        return this.http.get<TaxpayerType>(this.url + '/' + id);
    }
    getEntities(): Observable<Entity[]> {
        return this.http.get<Entity[]>(this.url + '/list');
    }
    updateTaxpayerType(taxpayerType: TaxpayerType): Observable<TaxpayerType> {
        return this.http.put<TaxpayerType>(this.url + '/update-taxpayer-type/' + taxpayerType.id, taxpayerType);
    }
    deleteTaxpayerType(id: number): Observable<any> {
        return this.http.delete<any>(this.url + '/delete-taxpayer-type/' + id);
    }
}
