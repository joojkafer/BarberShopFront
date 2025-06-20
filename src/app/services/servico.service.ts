import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servico } from '../models/servico';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  private API = `${environment.apiUrl}/servico`;
  http = inject(HttpClient);

  findAll(): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${this.API}/findAll`);
  }

  findById(id: number): Observable<Servico> {
    return this.http.get<Servico>(`${this.API}/findById/${id}`);
  }

  save(servico: Servico): Observable<string> {
    return this.http.post<string>(`${this.API}/save`, servico, { responseType: 'text' as 'json' });
  }

  update(servico: Servico): Observable<string> {
    return this.http.put<string>(`${this.API}/update/${servico.idServico}`, servico, { responseType: 'text' as 'json' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/delete/${id}`, { responseType: 'text' as 'json' });
  }
}
