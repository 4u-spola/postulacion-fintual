import { Stock } from "./stock";

/**
 * Clase que representa el historial de una acción.
 */
export class StockHistory {
    private readonly stock: Stock;
    private readonly date: Date;
    private readonly price: number;
    private readonly old_price?: number;

    /**
     * Constructor de la clase StockHistory.
     * @param stock - La acción.
     * @param date - La fecha del historial.
     * @param price - El precio de la acción.
     * @param old_price - El precio anterior de la acción.
     */
    constructor(stock: Stock, date: Date, price: number, old_price?: number) {
        this.stock = stock;
        this.date = date;
        this.price = price;
        this.old_price = old_price;
    }

    /**
     * Método que obtiene la acción.
     * @returns La acción.
     */
    public getStock(): Stock {
        return this.stock;
    }

    /**
     * Método que obtiene la fecha del historial.
     * @returns La fecha del historial.
     */
    public getDate(): Date {
        return this.date;
    }

    /**
     * Método que obtiene el precio de la acción.
     * @returns El precio de la acción.
     */
    public getPrice(): number {
        return this.price;
    }

    /**
     * Método que obtiene el precio anterior de la acción.
     * @returns El precio anterior de la acción.
     */
    public getOldPrice(): number | undefined {
        return this.old_price;
    }
}