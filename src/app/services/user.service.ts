import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Usuario } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient) { }

    public agregarUsuario( usuario:Usuario ) {
        return this.httpClient.post<Usuario>(`${baseUrl}/users/`, usuario);
    }
}
