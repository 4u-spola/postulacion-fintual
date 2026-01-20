import { Portfolio } from "./portfolio";
import { PortfolioAllocationHistory, PortfolioAllocationHistoryAction } from "./portfolio.-allocation-history";
import { StockAllocated } from "./stock-allocated";

describe('PortfolioAllocationHistory', () => {
    it('should create a portfolio allocation history instance', () => {
        const portfolioAllocationHistory = new PortfolioAllocationHistory(new Date(), [], [], 'change', new Portfolio());
        expect(portfolioAllocationHistory).toBeDefined();

        expect(portfolioAllocationHistory.getDate()).toBeDefined();
        expect(portfolioAllocationHistory.getOldStockAllocated()).toBeDefined();
        expect(portfolioAllocationHistory.getStockAllocated()).toBeDefined();
        expect(portfolioAllocationHistory.getAction()).toBeDefined();
        expect(portfolioAllocationHistory.getPortfolio()).toBeDefined();
    });

    it('should throw an error if the date is not provided', () => {
        expect(() => new PortfolioAllocationHistory(null as unknown as Date, [], [], 'change', new Portfolio())).toThrow('Date is required');
    });

    it('should throw an error if the old stock allocated is not provided', () => {
        expect(() => new PortfolioAllocationHistory(new Date(), null as unknown as readonly StockAllocated[], [], 'change', new Portfolio())).toThrow('Old stock allocated is required');
    });

    it('should throw an error if the stock allocated is not provided', () => {
        expect(() => new PortfolioAllocationHistory(new Date(), [], null as unknown as readonly StockAllocated[], 'change', new Portfolio())).toThrow('Stock allocated is required');
    });

    it('should throw an error if the action is not provided', () => {
        expect(() => new PortfolioAllocationHistory(new Date(), [], [], null as unknown as PortfolioAllocationHistoryAction, new Portfolio())).toThrow('Action is required');
    });

    it('should throw an error if the portfolio is not provided', () => {
        expect(() => new PortfolioAllocationHistory(new Date(), [], [], 'change', null as unknown as Portfolio)).toThrow('Portfolio is required');
    });
});