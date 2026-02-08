import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../../../services/crypto.service';
import { Moeda } from '../../../../models/moeda.model';

@Component({
  selector: 'app-crypto-table',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './crypto-table.html',
  styleUrl: './crypto-table.css'
})

export class CryptoTableComponent implements OnInit {
  
  private cryptoService = inject(CryptoService);

  moedas = signal<Moeda[]>([]);

  ngOnInit(): void {
    this.carregarDados();
  }

  // Função para buscar os dados
  carregarDados() {
    this.cryptoService.listarMoedas().subscribe({
      next: (dadosRecebidos) => {
        this.moedas.set(dadosRecebidos);
        console.log('Dados carregados com sucesso:', dadosRecebidos);
      },
      error: (erro) => {
        console.error('Erro ao buscar moedas:', erro);
      }
    });
  }
}