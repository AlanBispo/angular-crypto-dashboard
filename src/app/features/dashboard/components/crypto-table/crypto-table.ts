import { Component, inject, OnInit, signal, computed } from '@angular/core';
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
  estaCarregando = signal(false);

  termoDeBusca = signal('');

  listaFiltrada = computed(() => {
    const termo = this.termoDeBusca().toLowerCase();
    
    if (!termo) {
      return this.listaDeMoedas();
    }

    return this.listaDeMoedas().filter(moeda => 
      moeda.name.toLowerCase().includes(termo) || 
      moeda.symbol.toLowerCase().includes(termo)
    );
  });

  ngOnInit(): void {
    this.obterDadosDoMercado();
  }

  atualizarBusca(evento: Event) {
    const elementoInput = evento.target as HTMLInputElement;
    this.termoDeBusca.set(elementoInput.value);
  }

  obterDadosDoMercado() {
    this.estaCarregando.set(true);
    this.servicoCripto.listarMoedas().subscribe({
      next: (dados) => {
        setTimeout(() => {
          this.listaDeMoedas.set(dados);
          this.estaCarregando.set(false);
        }, 500);
      },
      error: () => this.estaCarregando.set(false)
    });
  }

  atualizarAgora() {
    this.obterDadosDoMercado();
  }
}