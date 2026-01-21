import { PortfolioAllocationHistory } from "./portfolio.-allocation-history";
import { PortfolioOwnedQuantity } from "./portfolio-owned-quantity.type";
import { Stock } from "./stock";
import { StockAllocated } from "./stock-allocated";

/**
 * Clase que representa un portfolio.
 */
export class Portfolio {
    private stockAllocated: readonly StockAllocated[];
    private readonly allocationHistory: PortfolioAllocationHistory[] = [];

    private readonly ownedStocks: PortfolioOwnedQuantity = {};

    /**
     * Constructor de la clase Portfolio.
     */
    constructor() {
        this.stockAllocated = [];
        this.allocationHistory.push(new PortfolioAllocationHistory(new Date(), [], [], 'initial', this));
    }

    /**
     * Método que obtiene las acciones asignadas al portfolio.
     * @returns Las acciones asignadas al portfolio.
     */
    public getStockAllocated(): readonly StockAllocated[] {
        return [...this.stockAllocated];
    }

    /**
     * Método que establece las acciones asignadas al portfolio.
     * Agrega un registro de historial de asignación de acciones.
     * @param stockAllocated - Las acciones asignadas al portfolio. Debe ser un array de instancias de StockAllocated.
     * 
     * @throws Error si la suma de las cantidades no es 100.
     */
    public setStockAllocated(stockAllocated: StockAllocated[]): void {

        const total = stockAllocated.map(stockAllocated => stockAllocated.getQuantity())
            .reduce((acc, curr) => acc + curr, 0);

        if (total !== 100) {
            throw new Error('The sum of the quantities must be 100');
        }

        this.allocationHistory.push(new PortfolioAllocationHistory(new Date(), this.stockAllocated, stockAllocated, 'change', this));
        this.stockAllocated = stockAllocated;
    }

    /**
     * Método que obtiene el historial de asignación de acciones.
     * @returns El historial de asignación de acciones.
     */
    public getAllocationHistory(): readonly PortfolioAllocationHistory[] {
        return [...this.allocationHistory];
    }

    /**
     * Método que obtiene las acciones asignadas al portfolio.
     * @returns Las acciones asignadas al portfolio.
     */
    public getOwnedStocks(): { [key: string]: { quantity: number, stock: Stock } } {
        return { ...this.ownedStocks };
    }

    /**
     * Método que registra una compra de acciones.
     * @param stock - La acción comprada. Debe ser una instancia de Stock.
     * @param quantity - La cantidad de la acción comprada. Debe ser un número y mayor a 0.
     * 
     * @throws Error si la acción no es válida.
     * @throws Error si la cantidad no es válida.
     */
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

    /**
     * Método que registra una venta de acciones.
     * @param stock - La acción vendida. Debe ser una instancia de Stock.
     * @param quantity - La cantidad de la acción vendida. Debe ser un número y mayor a 0.
     * 
     * @throws Error si la acción no es válida.
     * @throws Error si la cantidad no es válida.
     * @throws Error si la acción no está asignada al portfolio.
     * @throws Error si la cantidad es mayor a la cantidad de la acción asignada al portfolio.
     */
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

    /**
     * Método que calcula el valor de mercado del portfolio.
     * @returns El valor de mercado del portfolio.
     */
    public calculateMarketValue(): number {
        return Object.values(this.ownedStocks)
            .map(ownedStock => ownedStock.quantity * ownedStock.stock.getCurrentPrice())
            .reduce((acc, curr) => acc + curr, 0);
    }

    /**
     * Método que calcula la distribución actual del portfolio.
     * @returns La distribución actual del portfolio.
     */
    public currentAllocation(): { [key: string]: number } {
        const marketValue = this.calculateMarketValue();

        return Object.values(this.ownedStocks)
            .reduce((acc, ownedStock) => {
                acc[ownedStock.stock.getTicker()] = (ownedStock.quantity * ownedStock.stock.getCurrentPrice() / marketValue) * 100;
                return acc;
            }, {} as { [key: string]: number });
    }

    /**
     * Método que calcula la cantidad de acciones a vender o comprar.
     * @param stock - La acción. Debe ser una instancia de Stock.
     * @param quantity - La cantidad de la acción. Debe ser un número y mayor a 0.
     * @param marketValue - El valor de mercado del portfolio. Debe ser un número y mayor a 0.
     * @returns La cantidad de acciones a vender o comprar.
     */
    private calculateQuantityToSellOrBuy(stock: Stock, quantity: number, marketValue: number): number {
        const totalQuantity = quantity * marketValue / 100;

        return Math.round(totalQuantity / stock.getCurrentPrice() * 100) / 100;
    }

    /**
     * Método que calcula las acciones a vender o comprar para rebalancear el portfolio.
     * @returns Las acciones a vender o comprar.
     * 
     * @throws Error si el portfolio está vacío.
     */
    public rebalance(): { toSell: { ticker: string, quantity: number }[], toBuy: { ticker: string, quantity: number }[] } {
        // Validación de que el portfolio no esté vacío.
        if (Object.keys(this.ownedStocks).length === 0) {
            throw new Error('Portfolio is empty');
        }

        // Calcular algunos valores necesarios para el rebalanceo.
        const marketValue = this.calculateMarketValue();
        const currentAllocation = this.currentAllocation();
        const stockAllocated = this.getStockAllocated().reduce((acc, stockAllocated) => {
            acc[stockAllocated.getStock().getTicker()] = {
                quantity: stockAllocated.getQuantity(),
                stock: stockAllocated.getStock()
            };
            return acc;
        }, {} as { [key: string]: { quantity: number, stock: Stock } });

        const toSell: { ticker: string, quantity: number }[] = [];
        const toBuy: { ticker: string, quantity: number }[] = [];

        // Obtener las acciones que no están asignadas al portfolio.
        Object.keys(currentAllocation).filter(key => !stockAllocated[key]).forEach(key => {
            toSell.push({ ticker: key, quantity: this.ownedStocks[key].quantity });
        });

        // Obtener las acciones que están asignadas al portfolio.
        Object.keys(stockAllocated).forEach(key => {
            // Si la acción no está en la distribución actual, se debe comprar.
            if (!currentAllocation[key]) {
                const quantityToBuy = this.calculateQuantityToSellOrBuy(stockAllocated[key].stock, stockAllocated[key].quantity, marketValue);
                toBuy.push({ ticker: key, quantity: quantityToBuy });
            }
            // Si la acción está asignada al portfolio, se debe verificar si la cantidad asignada es diferente a la cantidad actual.
            else if (currentAllocation[key] !== stockAllocated[key].quantity) {
                // Si la cantidad asignada es mayor a la cantidad actual, se debe vender.
                if (currentAllocation[key] > stockAllocated[key].quantity) {
                    const quantityToSell = this.calculateQuantityToSellOrBuy(stockAllocated[key].stock, currentAllocation[key] - stockAllocated[key].quantity, marketValue);
                    toSell.push({ ticker: key, quantity: quantityToSell });
                } else {
                    const quantityToBuy = this.calculateQuantityToSellOrBuy(stockAllocated[key].stock, stockAllocated[key].quantity - currentAllocation[key], marketValue);
                    toBuy.push({ ticker: key, quantity: quantityToBuy });
                }
            }
        });

        return { toSell, toBuy };
    }
}