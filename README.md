# 💰 Angular Crypto Dashboard

Disponível para visualização em: https://angular-crypto-dashboard.vercel.app/

**OBS:** Esse projeto consulta uma API pública com limites de requisições, por isso ao navegar pela paginação, provavelmente irá apresentar um erro.

Um dashboard moderno de monitoramento de criptomoedas desenvolvido para explorar as funcionalidades mais recentes do **Angular 21**. O foco principal deste projeto é a alta performance e a experiência do desenvolvedor (DX), utilizando um fluxo de dados totalmente reativo.

---

## 🚀 Funcionalidades Principais

* **Gestão de Estado com Signals:** Utilização de `signal`, `computed` e `effect` para um controle de estado granular e eficiente.
* **Zoneless Change Detection:** Implementação sem `zone.js`, reduzindo o overhead de processamento e melhorando o tempo de resposta da interface.
* **Filtro em Tempo Real:** Busca instantânea por nome ou símbolo da moeda sem chamadas desnecessárias à rede.
* **Paginação Inteligente:** Navegação fluida entre os dados da API com controle de estado de carregamento.
* **Localização pt-BR:** Formatação automática de valores monetários e números para o padrão brasileiro (BRL).

---

## 🛠️ Tecnologias e Ferramentas

* **Angular 21:** Framework principal (Standalone Components).
* **TypeScript:** Tipagem estrita para maior segurança no desenvolvimento.
* **CoinGecko API:** Fonte de dados em tempo real para o mercado de cripto.
* **CSS Moderno:** Estilização focada em UX, incluindo animações de feedback (Blink/Loading).

---

## 🔧 Como Executar
1. Clone o repositório em sua máquina.
2. Instale as dependências:
   `npm install`
3. Inicie o servidor de desenvolvimento:
   `ng serve`
4. Acesse no navegador: http://localhost:4200
