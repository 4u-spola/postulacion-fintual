import { Portfolio } from "./portfolio";
import { StockAllocated } from "./stock-allocated";

/**
 * Tipo que representa la acción de un historial de asignación de acciones a un portfolio.
 */
export type PortfolioAllocationHistoryAction = 'initial' | 'change';

/**
 * Clase que representa el historial de asignación de acciones a un portfolio.
 */
export class PortfolioAllocationHistory {
    private readonly date: Date;
    private readonly oldStockAllocated: readonly StockAllocated[];
    private readonly stockAllocated: readonly StockAllocated[];
    private readonly action: PortfolioAllocationHistoryAction;
    private readonly portfolio: Portfolio;

    /**
     * Constructor de la clase PortfolioAllocationHistory.
     * @param date - La fecha del historial. Debe ser una instancia de Date.
     * @param oldStockAllocated - Las acciones asignadas anteriormente. Debe ser un array de instancias de StockAllocated.
     * @param stockAllocated - Las acciones asignadas actualmente. Debe ser un array de instancias de StockAllocated.
     * @param action - La acción del historial. Debe ser un valor del tipo PortfolioAllocationHistoryAction.
     * @param portfolio - El portfolio. Debe ser una instancia de Portfolio.
     */
    constructor(date: Date, oldStockAllocated: readonly StockAllocated[], stockAllocated: readonly StockAllocated[], action: PortfolioAllocationHistoryAction, portfolio: Portfolio) {
        this.validateParams(date, oldStockAllocated, stockAllocated, action, portfolio);

        this.date = date;
        this.oldStockAllocated = oldStockAllocated;
        this.stockAllocated = stockAllocated;
        this.action = action;
        this.portfolio = portfolio;
    }

    /**
     * Método que valida los parámetros del constructor.
     * @param date - La fecha del historial. Debe ser una instancia de Date.
     * @param oldStockAllocated - Las acciones asignadas anteriormente. Debe ser un array de instancias de StockAllocated.
     * @param stockAllocated - Las acciones asignadas actualmente. Debe ser un array de instancias de StockAllocated.
     * @param action - La acción del historial. Debe ser un valor del tipo PortfolioAllocationHistoryAction.
     * @param portfolio - El portfolio. Debe ser una instancia de Portfolio.
     */
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

    /**
     * Método que obtiene la fecha del historial.
     * @returns La fecha del historial.
     */
    public getDate(): Date {
        return this.date;
    }

    /**
     * Método que obtiene las acciones asignadas anteriormente.
     * @returns Las acciones asignadas anteriormente.
     */
    public getOldStockAllocated(): readonly StockAllocated[] {
        return this.oldStockAllocated;
    }

    /**
     * Método que obtiene las acciones asignadas actualmente.
     * @returns Las acciones asignadas actualmente.
     */
    public getStockAllocated(): readonly StockAllocated[] {
        return this.stockAllocated;
    }

    /**
     * Método que obtiene la acción del historial.
     * @returns La acción del historial.
     */
    public getAction(): PortfolioAllocationHistoryAction {
        return this.action;
    }

    /**
     * Método que obtiene el portfolio.
     * @returns El portfolio.
     */
    public getPortfolio(): Portfolio {
        return this.portfolio;
    }
}