// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// Locals
import { ClienteModel } from '../models/cliente.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ClienteService {
    private headers = new HttpHeaders({'Content-type': 'application/json'});

    constructor(private _http: HttpClient) {}

// Método para traer los datos de todos los clientes de la BD.
    getClientes(): Observable<ClienteModel[]> {
        const url = `${environment.urlClientes}${environment.urlJson}`;
        return this._http.get<ClienteModel[]>(url, {headers: this.headers});
    }

// Método para traer los datos de un cliente de la BD.
    getClienteDetail(id: string): Observable<ClienteModel> {
        const url = `${environment.urlClienteDetail}${id}${environment.urlJson}`;
        return this._http.get<ClienteModel>(url, {headers: this.headers});
    }

// Método para crear un nuevo cliente o modificar uno existente.
    saveCliente(cliente: ClienteModel): Observable<any> {
        if (cliente.id === null) {
            const url = `${environment.urlClientes}`;
            return this._http.post(url, JSON.stringify(cliente), {headers: this.headers});
        } else {
            const url = `${environment.urlClienteDetail}${cliente.id}`;
            return this._http.put(url, JSON.stringify(cliente), {headers: this.headers});
        }
    }

// Método para borrar un cliente de la BD.
    deleteCliente(id: string): Observable<ClienteModel> {
        const url = `${environment.urlClienteDetail}${id}`;
        return this._http.delete<ClienteModel>(url, {headers: this.headers});
    }
}
