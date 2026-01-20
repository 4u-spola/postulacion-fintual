import { Portfolio } from "./portfolio";
import { StockAllocated } from "./stock-allocated";

export type PortfolioAllocationHistoryAction = 'initial' | 'change';

export class PortfolioAllocationHistory {
    private readonly date: Date;
    private readonly oldStockAllocated: readonly StockAllocated[];
    private readonly stockAllocated: readonly StockAllocated[];
    private readonly action: PortfolioAllocationHistoryAction;
    private readonly portfolio: Portfolio;

    constructor(date: Date, oldStockAllocated: readonly StockAllocated[], stockAllocated: readonly StockAllocated[], action: PortfolioAllocationHistoryAction, portfolio: Portfolio) {
        this.validateParams(date, oldStockAllocated, stockAllocated, action, portfolio);

        this.date = date;
        this.oldStockAllocated = oldStockAllocated;
        this.stockAllocated = stockAllocated;
        this.action = action;
        this.portfolio = portfolio;
    }

    private validateParams(date: Date, oldStockAllocated: readonly StockAllocated[], stockAllocated: readonly StockAllocated[], action: PortfolioAllocationHistoryAction, portfolio: Portfolio): void {

        if (!date) {
            throw new Error('Date is required');
        }
        if (!oldStockAllocated) {
            throw new Error('Old stock allocated is required');
        }

        if (!stockAllocated) {
            throw new Error('Stock allocated is required');
        }
        if (!action) {
            throw new Error('Action is required');
        }
        if (!portfolio) {
            throw new Error('Portfolio is required');
        }
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