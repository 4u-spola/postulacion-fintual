import { Stock } from "./stock";
import { StockAllocated } from "./stock-allocated";

export class Portfolio {
    private readonly stockAllocated: StockAllocated[];

    constructor() {
        this.stockAllocated = [];
    }
}