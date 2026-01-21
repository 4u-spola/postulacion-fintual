import { StockHistory } from "./stock-history";

/**
 * Clase que representa una acción.
 */
export class Stock {
    private readonly ticker: string;
    private name: string;
    private price: number;

    private readonly history: StockHistory[] = [];

    /**
     * Constructor de la clase Stock.
     * @param ticker - El ticker de la acción.
     * @param name - El nombre de la acción.
     * @param price - El precio de la acción.
     */
    constructor(ticker: string, name: string, price: number) {
        this.validateParams(ticker, name, price);

        this.ticker = ticker;
        this.name = name;
        this.price = price;

        this.history.push(new StockHistory(this, new Date(), price));
    }

    /**
     * Método que valida los parámetros del constructor.
     * @param ticker - El ticker de la acción. Debe ser una cadena de texto y no estar vacío.
     * @param name - El nombre de la acción. Debe ser una cadena de texto y no estar vacío.
     * @param price - El precio de la acción. Debe ser un número y mayor a 0.
     */
    private validateParams(ticker: string, name: string, price: number): void {
        if (!ticker || ticker.length === 0) {
            throw new Error('Ticker is required');
        }
        if (!name || name.length === 0) {
            throw new Error('Name is required');
        }
        if (price <= 0 || isNaN(price)) {
            throw new Error('Price must be greater than 0');
        }
    }
    
    /**
     * Método que obtiene el ticker de la acción.
     * @returns El ticker de la acción.
     */
    public getTicker(): string {
        return this.ticker;
    }

    /**
     * Método que obtiene el historial de la acción.
     * @returns El historial de la acción.
     */
    public getHistory(): StockHistory[] {
        return this.history;
    }

    /**
     * Método que obtiene el precio actual de la acción.
     * @returns El precio actual de la acción.
     */
    public getCurrentPrice(): number {
        return this.price;
    }

    /**
     * Método que establece el precio actual de la acción.
     * @param price - El precio de la acción. Debe ser un número y mayor a 0.
     * @throws Error si el precio no es válido.
     */
    public setCurrentPrice(price: number): void {
        this.validateParams(this.ticker, this.name, price);

        this.price = price;
        this.history.push(new StockHistory(this, new Date(), price));
    }
}
