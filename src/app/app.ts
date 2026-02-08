import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CryptoTableComponent } from './features/dashboard/components/crypto-table/crypto-table';
import { ResumoCarteiraComponent } from './features/dashboard/components/resumo-carteira/resumo-carteira'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CryptoTableComponent, ResumoCarteiraComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  tituloDoApp = signal('💰 Meu Dashboard Cripto');
}