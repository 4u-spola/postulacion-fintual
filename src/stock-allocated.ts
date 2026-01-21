import { Stock } from "./stock";

/**
 * Clase que representa una acción asignada a un portfolio.
 */
export class StockAllocated {
    private readonly stock: Stock;
    private readonly quantity: number;

    /**
     * Constructor de la clase StockAllocated.
     * @param stock - La acción. Debe ser una instancia de Stock.
     * @param quantity - La cantidad de la acción. Debe ser un número y mayor a 0 y menor a 100.
     */
    constructor(stock: Stock, quantity: number) {
        this.validateParams(stock, quantity);

        this.stock = stock;
        this.quantity = quantity;
    }

    /**
     * Método que valida los parámetros del constructor.
     * @param stock - La acción. Debe ser una instancia de Stock.
     * @param quantity - La cantidad de la acción. Debe ser un número y mayor a 0 y menor a 100.
     */
    private validateParams(stock: Stock, quantity: number): void {
        if (!stock) {
            throw new Error('Stock is required');
        }
        if (!quantity || typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
            throw new Error('Quantity must be a positive number');
        }
        if (quantity > 100) {
            throw new Error('Quantity must be lower than 100');
        }
    }

    /**
     * Método que obtiene la acción.
     * @returns La acción.
     */
    public getStock(): Stock {
        return this.stock;
    }

    /**
     * Método que obtiene la cantidad de la acción.
     * @returns La cantidad de la acción.
     */
    public getQuantity(): number {
        return this.quantity;
    }
}