import { Stock } from './stock';
import { StockHistory } from './stock-history';

describe('Stock', () => {

    describe('constructor', () => {

        it('should create a stock instance', () => {
            const stock = new Stock('AAPL', 'Apple Inc.', 150);
            expect(stock).toBeDefined();
        });

        it('should add a stock history', () => {
            const stock = new Stock('AAPL', 'Apple Inc.', 150);
            const history = stock.getHistory();

            expect(history).toBeDefined();
            expect(history).toHaveLength(1);
            expect(history[0]).toEqual(expect.objectContaining({
                stock: stock,
                date: expect.any(Date),
                price: 150,
            }));
        });

        it('should throw an error if the ticker is not provided', () => {
            expect(() => new Stock('', 'Apple Inc.', 150)).toThrow('Ticker is required');
            expect(() => new Stock(null as unknown as string, 'Apple Inc.', 150)).toThrow('Ticker is required');
            expect(() => new Stock(undefined as unknown as string, 'Apple Inc.', 150)).toThrow('Ticker is required');
        });

        it('should throw an error if the name is not provided', () => {
            expect(() => new Stock('AAPL', '', 150)).toThrow('Name is required');
            expect(() => new Stock('AAPL', null as unknown as string, 150)).toThrow('Name is required');
            expect(() => new Stock('AAPL', undefined as unknown as string, 150)).toThrow('Name is required');
        });

        it('should throw an error if the price is not provided', () => {
            expect(() => new Stock('AAPL', 'Apple Inc.', 0)).toThrow('Price must be greater than 0');
            expect(() => new Stock('AAPL', 'Apple Inc.', null as unknown as number)).toThrow('Price must be greater than 0');
            expect(() => new Stock('AAPL', 'Apple Inc.', undefined as unknown as number)).toThrow('Price must be greater than 0');
        });
    });



    describe('getter and setter', () => {
        let stock: Stock;

        beforeEach(() => {
            stock = new Stock('AAPL', 'Apple Inc.', 150);
        });

        describe('current price', () => {
            it('should get the current price', () => {
                expect(stock.getCurrentPrice()).toBe(150);
            });

            it('should set the current price', () => {
                stock.setCurrentPrice(160);
                expect(stock.getCurrentPrice()).toBe(160);
                expect(stock.getHistory()).toHaveLength(2);
            });
        });
    });
});
