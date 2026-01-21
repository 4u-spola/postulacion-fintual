import { Portfolio } from "./src/portfolio";
import { Stock } from "./src/stock";
import { StockAllocated } from "./src/stock-allocated";

const balancePortfolio = (portfolio: Portfolio, stocks: { [key: string]: Stock }) => {
    const actions = portfolio.rebalance();
    console.log('Rebalance Actions', actions);

    console.info('Registrando las ventas');
    actions.toSell.forEach(action => {
        portfolio.registerSellTransaction(stocks[action.ticker], action.quantity);
    });

    console.info('Registrando las compras');
    actions.toBuy.forEach(action => {
        portfolio.registerBuyTransaction(stocks[action.ticker], action.quantity);
    });
}

console.info('- Creando las acciones');

const stock1 = new Stock('AAPL', 'Apple Inc.', 100);
const stock2 = new Stock('META', 'Meta Platforms', 200);
const stock3 = new Stock('GOOG', 'Google', 300);

const stocks: { [key: string]: Stock } = {
    'AAPL': stock1,
    'META': stock2,
    'GOOG': stock3,
}

console.info('- Creando el portfolio');
const portfolio = new Portfolio();
console.info('- Seteando las acciones asignadas');
portfolio.setStockAllocated([new StockAllocated(stock1, 20), new StockAllocated(stock2, 20), new StockAllocated(stock3, 60)]);

console.info('- Registrando las compras');
portfolio.registerBuyTransaction(stock1, 100);
portfolio.registerBuyTransaction(stock2, 100);
portfolio.registerBuyTransaction(stock3, 100);

console.log('- Current Allocation', portfolio.currentAllocation());

balancePortfolio(portfolio, stocks);

console.log('- Current Allocation', portfolio.currentAllocation());

console.info('- Cambiando el precio de las acciones');
stock1.setCurrentPrice(1000);
stock2.setCurrentPrice(2000);
stock3.setCurrentPrice(3000);

console.log('- Current Allocation', portfolio.currentAllocation());

console.info('- Cambiando el precio de acción de GOOG a 300');
stock3.setCurrentPrice(300);

console.log('- Current Allocation', portfolio.currentAllocation());

balancePortfolio(portfolio, stocks);

console.log('- Current Allocation', portfolio.currentAllocation());