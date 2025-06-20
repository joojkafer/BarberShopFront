import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Funcionario } from '../models/funcionario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private API = `${environment.apiUrl}/funcionario`;
  http = inject(HttpClient);

  findAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.API}/findAll`).pipe(
      catchError(this.handleError)
    );
  }

  findById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.API}/findById/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  save(funcionario: Funcionario): Observable<string> {
    return this.http.post(`${this.API}/save`, funcionario, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    ) as Observable<string>;
  }

  update(funcionario: Funcionario): Observable<string> {
    return this.http.put(`${this.API}/update/${funcionario.idUsuario}`, funcionario, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    ) as Observable<string>;
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.API}/delete/${id}`, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    ) as Observable<string>;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Erro código ${error.status}: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}