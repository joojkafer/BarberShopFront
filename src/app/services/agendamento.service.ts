import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../models/agendamento';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private baseUrl = `${environment.apiUrl}/agendamento`;

  constructor(private http: HttpClient) {}

  save(agendamento: Agendamento): Observable<string> {
    return this.http.post(`${this.baseUrl}/save`, agendamento, { responseType: 'text' }) as Observable<string>;
  }

  update(agendamento: Agendamento, id: number): Observable<string> {
    return this.http.put(`${this.baseUrl}/update/${id}`, agendamento, { responseType: 'text' }) as Observable<string>;
  }

  findById(id: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${this.baseUrl}/findById/${id}`);
  }

  findAll(
    dataInicio?: string,
    dataFim?: string,
    idBarbeiro?: number,
    idFuncionario?: number
  ): Observable<Agendamento[]> {
    let params = new HttpParams();
    if (dataInicio) params = params.set('dataInicio', dataInicio);
    if (dataFim) params = params.set('dataFim', dataFim);
    if (idBarbeiro) params = params.set('idBarbeiro', idBarbeiro.toString());
    if (idFuncionario) params = params.set('idFuncionario', idFuncionario.toString());

    return this.http.get<Agendamento[]>(`${this.baseUrl}/findAll`, { params });
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' }) as Observable<string>;
  }
}
