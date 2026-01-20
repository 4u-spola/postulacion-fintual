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
        (portfolio.getStockAllocated() as StockAllocated[]).push(stockAllocated);
        expect(portfolio.getStockAllocated()).toHaveLength(0);
    });

    it('should not be able to set stock allocated if the sum of the quantities is not 100', () => {
        const portfolio = new Portfolio();
        const stockAllocated = new StockAllocated(new Stock('AAPL', 'Apple Inc.', 150), 70);
        expect(() => portfolio.setStockAllocated([stockAllocated])).toThrow('The sum of the quantities must be 100');
    });

    it('should be able to set stock allocated if the sum of the quantities is 100', () => {
        const portfolio = new Portfolio();
        const stockAllocated1 = new StockAllocated(new Stock('AAPL', 'Apple Inc.', 150), 70);
        const stockAllocated2 = new StockAllocated(new Stock('META', 'Meta Platforms', 250), 30);
        portfolio.setStockAllocated([stockAllocated1, stockAllocated2]);

        expect(portfolio.getStockAllocated()).toHaveLength(2);
    });
});