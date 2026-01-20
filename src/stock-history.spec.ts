import { Stock } from './stock';
import { StockHistory } from './stock-history';

describe('StockHistory', () => {
    it('should create a stock instance', () => {
        const stockHistory = new StockHistory(new Stock('AAPL', 'Apple Inc.', 150), new Date(), 150);
        expect(stockHistory).toBeDefined();
    });

    it('should have a stock', () => {
        const stockHistory = new StockHistory(new Stock('AAPL', 'Apple Inc.', 150), new Date(), 150);
        expect(stockHistory.getStock()).toBeDefined();
        expect(stockHistory.getStock()).toEqual(new Stock('AAPL', 'Apple Inc.', 150));
    });

    it('should have a date', () => {
        const stockHistory = new StockHistory(new Stock('AAPL', 'Apple Inc.', 150), new Date(), 150);
        expect(stockHistory.getDate()).toBeDefined();
        expect(stockHistory.getDate()).toEqual(new Date());
    });

    it('should have a price', () => {
        const stockHistory = new StockHistory(new Stock('AAPL', 'Apple Inc.', 150), new Date(), 150);
        expect(stockHistory.getPrice()).toBeDefined();
        expect(stockHistory.getPrice()).toEqual(150);
    });

    it('should have an old price', () => {
        const stockHistory = new StockHistory(new Stock('AAPL', 'Apple Inc.', 150), new Date(), 150, 140);
        expect(stockHistory.getOldPrice()).toBeDefined();
        expect(stockHistory.getOldPrice()).toEqual(140);
    });
});
