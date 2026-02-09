import { Component, inject, OnInit, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
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
  private platformId = inject(PLATFORM_ID);

  listaDeMoedas = signal<Moeda[]>([]);
  estaCarregando = signal(false);

  termoDeBusca = signal('');
  paginaAtual = signal(1);
  itensPorPagina = 10;
  mensagemErro = signal<string | null>(null);

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
    this.mensagemErro.set(null);
    
    const pagina = paginaParaBuscar || this.paginaAtual();

    this.servicoCripto.listarMoedas(pagina, this.itensPorPagina).subscribe({
      next: (dados) => {
        this.listaDeMoedas.set(dados);
        this.estaCarregando.set(false);
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      error: (err) => {
        this.estaCarregando.set(false);
        if (err.status === 429) {
          this.mensagemErro.set('Limite de consultas atingido. Aguarde 1 minuto.');
        } else {
          this.mensagemErro.set('Erro ao carregar dados. Tente novamente.');
        }
      }
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