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

    
});