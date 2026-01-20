import { Portfolio } from "./portfolio";

describe('Portfolio', () => {
    it('should create a portfolio instance', () => {
        const portfolio = new Portfolio();
        expect(portfolio).toBeDefined();
    });
});