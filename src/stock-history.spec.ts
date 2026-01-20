import { Stock } from './stock';
import { StockHistory } from './stock-history';

describe('StockHistory', () => {
    it('should create a stock instance', () => {
        const stockHistory = new StockHistory(new Stock('AAPL', 'Apple Inc.', 150), new Date(), 150);
        expect(stockHistory).toBeDefined();
    });
});
