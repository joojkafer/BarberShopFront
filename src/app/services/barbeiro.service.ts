// src/app/services/barbeiro.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Barbeiro } from '../models/barbeiro';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BarbeiroService {
  private API = `${environment.apiUrl}/barbeiro`;
  private http = inject(HttpClient);

  findAll(): Observable<Barbeiro[]> {
    return this.http.get<Barbeiro[]>(`${this.API}/findAll`);
  }

  findById(id: number): Observable<Barbeiro> {
    return this.http.get<Barbeiro>(`${this.API}/findById/${id}`);
  }

  save(barbeiro: Barbeiro): Observable<string> {
    return this.http.post<string>(`${this.API}/save`, barbeiro, { responseType: 'text' as 'json' });
  }

  update(barbeiro: Barbeiro): Observable<string> {
    return this.http.put<string>(`${this.API}/update/${barbeiro.idBarbeiro}`, barbeiro, { responseType: 'text' as 'json' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/${id}`, { responseType: 'text' as 'json' });
  }

  findByNome(nome: string): Observable<Barbeiro[]> {
    return this.http.get<Barbeiro[]>(`${this.API}/findByNome?nome=${nome}`);
  }
}
