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
  private servicoCripto = inject(CryptoService);

  listaDeMoedas = signal<Moeda[]>([]);
  
  // NOVO: Signal para controlar se a tabela está a carregar/atualizar
  estaCarregando = signal(false);

  ngOnInit(): void {
    this.obterDadosDoMercado();
  }

  // Função principal para carregar dados
  obterDadosDoMercado() {
    this.estaCarregando.set(true);

    this.servicoCripto.listarMoedas().subscribe({
      next: (dados) => {
        setTimeout(() => {
          this.listaDeMoedas.set(dados);
          this.estaCarregando.set(false);
        }, 500);
      },
      error: (erro) => {
        console.error('Erro ao atualizar:', erro);
        this.estaCarregando.set(false);
      }
    });
  }
  
  atualizarAgora() {
    this.obterDadosDoMercado();
  }
}