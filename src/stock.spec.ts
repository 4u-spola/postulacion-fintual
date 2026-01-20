import { Stock } from './stock';
import { StockHistory } from './stock-history';

describe('Stock', () => {
    it('should create a stock instance', () => {
        const stock = new Stock('AAPL', 'Apple Inc.', 150);
        expect(stock).toBeDefined();
    });

    it('should add a stock history', () => {
        const stock = new Stock('AAPL', 'Apple Inc.', 150);
        const history = stock.getHistory();
        
        expect(history).toBeDefined();
        expect(history).toHaveLength(1);
        expect(history[0]).toEqual(new StockHistory(stock, new Date(), 150));
    });
});
