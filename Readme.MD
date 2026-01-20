# Desafío 

Postulante: Sergio Pola


*You’re building a portfolio management module, part of a personal investments and trading app
Construct a simple Portfolio class that has a collection of Stocks. Assume each Stock has a “Current Price” method that receives the last available price. Also, the Portfolio class has a collection of “allocated” Stocks that represents the distribution of the Stocks the Portfolio is aiming (i.e. 40% META, 60% APPL)
Provide a portfolio rebalance method to know which Stocks should be sold and which ones should be bought to have a balanced Portfolio based on the portfolio’s allocation.
Add documentation/comments to understand your thinking process and solution*

**Important**: If you use LLMs that’s ok, but you must share the conversations.

## Instalación

El sistema utiliza pnpm como administrador de paquetes por lo que se debe tener instalado para realizarlo.

Se prefirió utilizar pnpm por el mejor manejo de espacio en disco duro y mejor tiempo de procesamiento.

En lo personal, prefieron usar pnpm y ahorrarme el diferencian npm de npx.


```bash
pnpm install
```

## Ejecución




```bash
pnpm start
```


## Estrategia para balance

1. Calcular el valor de mercado de la cartera
2. obtener acciones a ser vendidas

Por cada acción que permanece en la cartera

3. Calcular monto de las acciones
4. Comparar monto calculado con monto esperado de la distribución
5. Calcular cuaántas acciones vender o comprar dependiendo si el monto es mayor que el esperado o es menor

