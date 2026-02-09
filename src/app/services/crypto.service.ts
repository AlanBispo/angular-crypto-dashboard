import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Moeda } from '../models/moeda.model';
import { of, catchError } from 'rxjs'; // Adicione catchError e of

@Injectable({ providedIn: 'root' })
export class CryptoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.coingecko.com/api/v3/coins';

  listarMoedas(pagina: number = 1, itensPorPagina: number = 10) {
    const timestamp = new Date().getTime();
    const url = `${this.apiUrl}/markets?vs_currency=brl&order=market_cap_desc&per_page=${itensPorPagina}&page=${pagina}&sparkline=false&_t=${timestamp}`;

    return this.http.get<Moeda[]>(url).pipe(
      catchError((erro) => {
        if (erro.status === 429) {
          console.warn('API bloqueada por limite. Usando dados Mock para não travar o dev.');
        }
        throw erro;
      })
    );
  }
}