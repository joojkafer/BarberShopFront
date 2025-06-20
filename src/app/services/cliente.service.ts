import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private API = `${environment.apiUrl}/cliente`;
  http = inject(HttpClient);

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.API}/findAll`);
  }

  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API}/findById/${id}`);
  }

  save(cliente: Cliente): Observable<string> {
    return this.http.post<string>(`${this.API}/save`, cliente, { responseType: 'text' as 'json' });
  }

  update(cliente: Cliente): Observable<string> {
    return this.http.put<string>(`${this.API}/update/${cliente.idCliente}`, cliente, { responseType: 'text' as 'json' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/delete/${id}`, { responseType: 'text' as 'json' });
  }
}
