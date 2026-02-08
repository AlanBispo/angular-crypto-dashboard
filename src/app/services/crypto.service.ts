import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Moeda } from '../models/moeda.model';

@Injectable({
  providedIn: 'root' // Isso é CRUCIAL: diz que é um Serviço Global
})
export class CryptoService {
  // Injeta o cliente HTTP (Jeito moderno do Angular 17+)
  private http = inject(HttpClient);
  
  // Pega a URL que definimos no environment.ts
  private readonly baseUrl = environment.apiUrl;

  /**
   * Busca a lista de moedas.
   * Retorna um Observable (fluxo de dados) contendo um array de Moedas.
   */
  listarMoedas(moedaBase: string = 'brl'): Observable<Moeda[]> {
    const params = {
      vs_currency: moedaBase,
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
      sparkline: false
    };

    return this.http.get<Moeda[]>(`${this.baseUrl}/coins/markets`, { params });
  }
}