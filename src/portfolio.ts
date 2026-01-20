import { PortfolioAllocationHistory } from "./portfolio.-allocation-history";
import { PortfolioOwnedQuantity } from "./portfolio-owned-quantity.type";
import { Stock } from "./stock";
import { StockAllocated } from "./stock-allocated";

export class Portfolio {
    private stockAllocated: readonly StockAllocated[];
    private readonly allocationHistory: PortfolioAllocationHistory[] = [];

    private readonly ownedStocks: PortfolioOwnedQuantity = {};

    constructor() {
        this.stockAllocated = [];
        this.allocationHistory.push(new PortfolioAllocationHistory(new Date(), [], [], 'initial', this));
    }

    public getStockAllocated(): readonly StockAllocated[] {
        return [...this.stockAllocated];
    }

    public setStockAllocated(stockAllocated: StockAllocated[]): void {

        const total = stockAllocated.map(stockAllocated => stockAllocated.getQuantity())
            .reduce((acc, curr) => acc + curr, 0);

        if (total !== 100) {
            throw new Error('The sum of the quantities must be 100');
        }

        this.allocationHistory.push(new PortfolioAllocationHistory(new Date(), this.stockAllocated, stockAllocated, 'change', this));
        this.stockAllocated = stockAllocated;
    }

    public getAllocationHistory(): readonly PortfolioAllocationHistory[] {
        return [...this.allocationHistory];
    }

    public getOwnedStocks(): { [key: string]: { quantity: number, stock: Stock } } {
        return { ...this.ownedStocks };
    }

    public registerBuyTransaction(stock: Stock, quantity: number): void {
        if (!stock) {
            throw new Error('Stock is required');
        }
        if (!quantity || typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
            throw new Error('Quantity must be a positive number');
        }

        if (this.ownedStocks[stock.getTicker()]) {
            this.ownedStocks[stock.getTicker()].quantity += quantity;
        } else {
            this.ownedStocks[stock.getTicker()] = { quantity, stock };
        }
    }

    public registerSellTransaction(stock: Stock, quantity: number): void {
        if (!stock) {
            throw new Error('Stock is required');
        }
        if (!quantity || typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
            throw new Error('Quantity must be a positive number');
        }

        const ownedStock = this.ownedStocks[stock.getTicker()];
        if (!ownedStock) {
            throw new Error('Stock is not owned');
        }

        if (ownedStock.quantity < quantity) {
            throw new Error('Quantity must be less than the owned quantity');
        }

        ownedStock.quantity -= quantity;

        if (ownedStock.quantity === 0) {
            delete this.ownedStocks[stock.getTicker()];
        }
    }

    public calculateMarketValue(): number {
        return Object.values(this.ownedStocks)
            .map(ownedStock => ownedStock.quantity * ownedStock.stock.getCurrentPrice())
            .reduce((acc, curr) => acc + curr, 0);
    }

    public currentAllocation(): { [key: string]: number } {
        const marketValue = this.calculateMarketValue();

        return Object.values(this.ownedStocks)
            .reduce((acc, ownedStock) => {
                acc[ownedStock.stock.getTicker()] = (ownedStock.quantity * ownedStock.stock.getCurrentPrice() / marketValue) * 100;
                return acc;
            }, {} as { [key: string]: number });
    }

    public rebalance(): { toSell: { ticker: string, quantity: number }[], toBuy: { ticker: string, quantity: number }[] } {
        const currentAllocation = this.currentAllocation();
        const stockAllocated = this.getStockAllocated().reduce((acc, stockAllocated) => {
            acc[stockAllocated.getStock().getTicker()] = stockAllocated.getQuantity();
            return acc;
        }, {} as { [key: string]: number });

        const toSell: { ticker: string, quantity: number }[] = [];
        const toBuy: { ticker: string, quantity: number }[] = [];
        // console.log(currentAllocation);
        // console.log(stockAllocated);


        Object.keys(currentAllocation).filter(key => !stockAllocated[key]).forEach(key => {
            toSell.push({ ticker: key, quantity: currentAllocation[key] });
        });

        Object.keys(stockAllocated).forEach(key => {
            if (!currentAllocation[key]) {
                console.log(`Buying ${key} ${stockAllocated[key]}`);
                toBuy.push({ ticker: key, quantity: stockAllocated[key] }); //TODO Calcular la cantidad de acciones a comprar
            }
            else if (currentAllocation[key] !== stockAllocated[key]) {
                if (currentAllocation[key] > stockAllocated[key]) {
                    console.log(`Selling ${key} ${currentAllocation[key] - stockAllocated[key]}`);
                    toSell.push({ ticker: key, quantity: currentAllocation[key] - stockAllocated[key] });
                } else {
                    console.log(`Buying ${key} ${stockAllocated[key] - currentAllocation[key]}`);
                    toBuy.push({ ticker: key, quantity: stockAllocated[key] - currentAllocation[key] });
                }
            }
        });

        // const rebalance = stockAllocated.reduce((acc, stockAllocated) => {
        //     acc[stockAllocated.getStock().getTicker()] = stockAllocated.getQuantity() - currentAllocation[stockAllocated.getStock().getTicker()];
        //     return acc;
        // }, {} as { [key: string]: number });
        // console.log(toSell);
        return { toSell, toBuy };
    }
}