import { Stock } from "./stock";

/**
 * Tipo que representa las acciones asignadas a un portfolio.
 * @property {string} key - El ticker de la acción.
 * @property {number} quantity - La cantidad de la acción.
 * @property {Stock} stock - La acción.
 */
export type PortfolioOwnedQuantity = Record<string, { quantity: number; stock: Stock }>;