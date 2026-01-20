import { Portfolio } from "./portfolio";
import { Stock } from "./stock";
import { StockAllocated } from "./stock-allocated";

describe('Portfolio', () => {
    it('should create a portfolio instance', () => {
        const portfolio = new Portfolio();
        expect(portfolio).toBeDefined();
    });

    it('should have a stock allocated', () => {
        const portfolio = new Portfolio();
        expect(portfolio.getStockAllocated()).toBeDefined();
        expect(portfolio.getStockAllocated()).toHaveLength(0);
    });

    it('should not be able to modify stock allocated changing the stocks array', () => {
        const portfolio = new Portfolio();
        const stockAllocated = new StockAllocated(new Stock('AAPL', 'Apple Inc.', 150), 100);
        portfolio.getStockAllocated().push(stockAllocated);
        expect(portfolio.getStockAllocated()).toHaveLength(0);
    });
});