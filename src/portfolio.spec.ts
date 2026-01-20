import { Portfolio } from "./portfolio";
import { PortfolioAllocationHistory } from "./portfolio.-allocation-history";
import { Stock } from "./stock";
import { StockAllocated } from "./stock-allocated";

describe('Portfolio', () => {
    describe('constructor', () => {
        it('should create a portfolio instance', () => {
            const portfolio = new Portfolio();
            expect(portfolio).toBeDefined();
        });

        it('should have a allocation history', () => {
            const portfolio = new Portfolio();
            expect(portfolio.getAllocationHistory()).toBeDefined();
            expect(portfolio.getAllocationHistory()).toHaveLength(1);

            expect(portfolio.getAllocationHistory()[0]).toEqual(expect.objectContaining({
                date: expect.any(Date),
                oldStockAllocated: expect.any(Array),
                stockAllocated: expect.any(Array),
                action: 'initial',
                portfolio: portfolio,
            }));
        });
    });

    describe('getStockAllocatted and setStockAllocated', () => {
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

        it('should add a allocation history when the stock allocated is set', () => {
            const portfolio = new Portfolio();
            const stockAllocated1 = new StockAllocated(new Stock('AAPL', 'Apple Inc.', 150), 70);
            const stockAllocated2 = new StockAllocated(new Stock('META', 'Meta Platforms', 250), 30);
            portfolio.setStockAllocated([stockAllocated1, stockAllocated2]);

            expect(portfolio.getAllocationHistory()).toHaveLength(2);
        });
    });

    describe('registerBuyTransaction', () => {
        it('should add a owned stock', () => {
            const portfolio = new Portfolio();
            const stock = new Stock('AAPL', 'Apple Inc.', 150);
            portfolio.registerBuyTransaction(stock, 100);

            expect(portfolio.getOwnedStocks()['AAPL']).toEqual(expect.objectContaining({
                quantity: 100,
                stock: stock,
            }));
        });

        it('should add a owned stock', () => {
            const portfolio = new Portfolio();
            const stock1 = new Stock('AAPL', 'Apple Inc.', 150);
            const stock2 = new Stock('META', 'Meta Platforms', 250);
            portfolio.registerBuyTransaction(stock1, 100);
            portfolio.registerBuyTransaction(stock2, 200);

            const aapl = portfolio.getOwnedStocks()['AAPL'];
            expect(aapl).toHaveProperty('quantity', 100);
            expect(aapl).toHaveProperty('stock');
            expect(aapl.stock.getTicker()).toBe(stock1.getTicker());

            const meta = portfolio.getOwnedStocks()['META'];
            expect(meta).toHaveProperty('quantity', 200);
            expect(meta).toHaveProperty('stock');
            expect(meta.stock.getTicker()).toBe(stock2.getTicker());

        });

        it('should throw an error if the quantity is not a number', () => {
            const portfolio = new Portfolio();
            const stock = new Stock('AAPL', 'Apple Inc.', 150);
            expect(() => portfolio.registerBuyTransaction(stock, '100' as unknown as number)).toThrow('Quantity must be a positive number');
            expect(() => portfolio.registerBuyTransaction(stock, undefined as unknown as number)).toThrow('Quantity must be a positive number');
            expect(() => portfolio.registerBuyTransaction(stock, null as unknown as number)).toThrow('Quantity must be a positive number');
            expect(() => portfolio.registerBuyTransaction(stock, -1)).toThrow('Quantity must be a positive number');
            expect(() => portfolio.registerBuyTransaction(stock, NaN)).toThrow('Quantity must be a positive number');
            expect(() => portfolio.registerBuyTransaction(stock, -Infinity)).toThrow('Quantity must be a positive number');
        });

        it('should throw an error if the stock is not provided', () => {
            const portfolio = new Portfolio();
            expect(() => portfolio.registerBuyTransaction(null as unknown as Stock, 100)).toThrow('Stock is required');
            expect(() => portfolio.registerBuyTransaction(undefined as unknown as Stock, 100)).toThrow('Stock is required');
        });
    });
});