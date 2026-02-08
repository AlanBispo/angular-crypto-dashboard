import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CryptoTableComponent } from './features/dashboard/components/crypto-table/crypto-table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CryptoTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  tituloDoApp = signal('💰 Meu Dashboard Cripto');
}