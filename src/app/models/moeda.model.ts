// estrutura de uma Moeda 
export interface Moeda {
  id: string;
  symbol: string;
  name: string;
  image: string;

  current_price: number; // Preço atual
  market_cap: number;    // Valor de mercado
  market_cap_rank: number; // Ranking
  price_change_percentage_24h: number; // Variação em % nas últimas 24h
}