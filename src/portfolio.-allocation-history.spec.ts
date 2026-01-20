import { Portfolio } from "./portfolio";
import { PortfolioAllocationHistory } from "./portfolio.-allocation-history";

describe('PortfolioAllocationHistory', () => {
    it('should create a portfolio allocation history instance', () => {
        const portfolioAllocationHistory = new PortfolioAllocationHistory(new Date(), [], [], 'buy', new Portfolio());
        expect(portfolioAllocationHistory).toBeDefined();

        expect(portfolioAllocationHistory.getDate()).toBeDefined();
        expect(portfolioAllocationHistory.getOldStockAllocated()).toBeDefined();
        expect(portfolioAllocationHistory.getStockAllocated()).toBeDefined();
        expect(portfolioAllocationHistory.getAction()).toBeDefined();
        expect(portfolioAllocationHistory.getPortfolio()).toBeDefined();
    });

    
});