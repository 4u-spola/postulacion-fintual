import { Stock } from './stock';

describe('Stock', () => {
    it('should create a stock instance', () => {
        const stock = new Stock('AAPL', 'Apple Inc.', 150);
        expect(stock).toBeDefined();
    });
});
