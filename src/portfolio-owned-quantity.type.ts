import { Stock } from "./stock";

export type PortfolioOwnedQuantity = {
    [key: string]: {
        quantity: number;
        stock: Stock;
    }
}