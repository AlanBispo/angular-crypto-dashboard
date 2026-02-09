import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../../../services/crypto.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-resumo-carteira',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumo-carteira.html',
  styleUrl: './resumo-carteira.css'
})
export class ResumoCarteiraComponent {
  private servicoCripto = inject(CryptoService);

  todasAsMoedas = toSignal(this.servicoCripto.listarMoedas(), { initialValue: [] });

  // Simulando as moedas que o usuário "possui"
  minhaPosicao = signal([
    { id: 'bitcoin', quantidade: 0.5 },
    { id: 'ethereum', quantidade: 2.0 }
  ]);

  // Se o preço do Bitcoin mudar, o saldoTotal atualiza
  saldoTotal = computed(() => {
    let total = 0;
    const moedasMercado = this.todasAsMoedas();
    
    this.minhaPosicao().forEach(posicao => {
      const dadosMoeda = moedasMercado.find(m => m.id === posicao.id);
      if (dadosMoeda) {
        total += dadosMoeda.current_price * posicao.quantidade;
      }
    });
    
    return total;
  });
}