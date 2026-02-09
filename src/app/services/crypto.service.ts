import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Moeda } from '../models/moeda.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private http = inject(HttpClient);
  
  private readonly baseUrl = environment.apiUrl;

  /**
   * Busca a lista de moedas.
   * Retorna um Observable (fluxo de dados) contendo um array de Moedas.
   */
  listarMoedas(pagina: number = 1, itensPorPagina: number = 20) {
    const timestamp = new Date().getTime();
    const url = `${this.baseUrl}/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=${itensPorPagina}&page=${pagina}&sparkline=false&_t=${timestamp}`;
    
    console.log('Chamando API:', url);
    
    return this.http.get<Moeda[]>(url);
  }
}