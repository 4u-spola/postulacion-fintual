import { Stock } from "./stock";
import { StockAllocated } from "./stock-allocated";

describe('StockAllocated', () => {
    let stock: Stock;

    beforeEach(() => {
        stock = new Stock('AAPL', 'Apple Inc.', 150);
    });

    it('should create a stock allocated instance', () => {
        const stockAllocated = new StockAllocated(stock, 100);
        expect(stockAllocated).toBeDefined();
        expect(stockAllocated.getStock()).toEqual(stock);
        expect(stockAllocated.getQuantity()).toEqual(100);
    });

    it('should throw an error if the stock is not provided', () => {
        expect(() => new StockAllocated(null as unknown as Stock, 100)).toThrow('Stock is required');
        expect(() => new StockAllocated(undefined as unknown as Stock, 100)).toThrow('Stock is required');
    });

    it('should throw an error if the quantity is not provided', () => {
        expect(() => new StockAllocated(stock, null as unknown as number)).toThrow('Quantity must be a positive number');
        expect(() => new StockAllocated(stock, undefined as unknown as number)).toThrow('Quantity must be a positive number');
    });

    it('should throw an error if the quantity is not a number', () => {
        expect(() => new StockAllocated(stock, '100' as unknown as number)).toThrow('Quantity must be a positive number');
        expect(() => new StockAllocated(stock, '100' as unknown as number)).toThrow('Quantity must be a positive number');
        expect(() => new StockAllocated(stock, '100' as unknown as number)).toThrow('Quantity must be a positive number');
    });

    it('should throw an error if the quantity is not a positive number or zero', () => {
        expect(() => new StockAllocated(stock, -1)).toThrow('Quantity must be a positive number');
        expect(() => new StockAllocated(stock, NaN)).toThrow('Quantity must be a positive number');
        expect(() => new StockAllocated(stock, Infinity)).toThrow('Quantity must be lower than 100');
        expect(() => new StockAllocated(stock, -Infinity)).toThrow('Quantity must be a positive number');
    });
});