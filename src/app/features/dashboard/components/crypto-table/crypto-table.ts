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

  paginaAtual = signal(1);
  itensPorPagina = 10;

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

  obterDadosDoMercado(paginaParaBuscar?: number) {
    this.estaCarregando.set(true);
    const pagina = paginaParaBuscar || this.paginaAtual();

    this.servicoCripto.listarMoedas(pagina, this.itensPorPagina).subscribe({
      next: (dados) => {
        this.listaDeMoedas.set(dados);
        this.estaCarregando.set(false);
      },
      error: () => this.estaCarregando.set(false)
    });
  }

  proximaPagina() {
    if (this.estaCarregando()) return;
    
    this.termoDeBusca.set(''); 
    
    this.paginaAtual.update(p => p + 1);
    
    this.obterDadosDoMercado();
  }

  paginaAnterior() {
    if (this.paginaAtual() > 1 && !this.estaCarregando()) {
      this.termoDeBusca.set('');
      this.paginaAtual.update(p => p - 1);
      
      console.log('Voltando para a página:', this.paginaAtual());
      this.obterDadosDoMercado();
    }
  }

  atualizarAgora() {
    this.obterDadosDoMercado();
  }
}