import { Portfolio } from "./portfolio";
import { StockAllocated } from "./stock-allocated";

export type PortfolioAllocationHistoryAction = 'buy' | 'sell';

export class PortfolioAllocationHistory {
    private readonly date: Date;
    private readonly oldStockAllocated: readonly StockAllocated[];
    private readonly stockAllocated: readonly StockAllocated[];
    private readonly action: PortfolioAllocationHistoryAction;
    private readonly portfolio: Portfolio;

    constructor(date: Date, oldStockAllocated: readonly StockAllocated[], stockAllocated: readonly StockAllocated[], action: PortfolioAllocationHistoryAction, portfolio: Portfolio) {
        this.date = date;
        this.oldStockAllocated = oldStockAllocated;
        this.stockAllocated = stockAllocated;
        this.action = action;
        this.portfolio = portfolio;
    }

    public getDate(): Date {
        return this.date;
    }

    public getOldStockAllocated(): readonly StockAllocated[] {
        return this.oldStockAllocated;
    }
    
    public getStockAllocated(): readonly StockAllocated[] {
        return this.stockAllocated;
    }

    public getAction(): PortfolioAllocationHistoryAction {
        return this.action;
    }

    public getPortfolio(): Portfolio {
        return this.portfolio;
    }
}