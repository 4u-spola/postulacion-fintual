# Desafío 

Postulante: Sergio Pola


*You’re building a portfolio management module, part of a personal investments and trading app
Construct a simple Portfolio class that has a collection of Stocks. Assume each Stock has a “Current Price” method that receives the last available price. Also, the Portfolio class has a collection of “allocated” Stocks that represents the distribution of the Stocks the Portfolio is aiming (i.e. 40% META, 60% APPL)
Provide a portfolio rebalance method to know which Stocks should be sold and which ones should be bought to have a balanced Portfolio based on the portfolio’s allocation.
Add documentation/comments to understand your thinking process and solution*

**Important**: If you use LLMs that’s ok, but you must share the conversations.

## Consideraciones generales

El presente proyecto fue programado por mi sni agentes IA para facilitar la evaluación de mis competencias. El uso que se le dió al agente fue como reemplazo de google y stackoverflow, la conversación la pueden encontrar en la carpeta docs y está referenciada al final de este archivo.

Para proyectos del día a día soy usuario de agentes con coordinación y múltiples perfiles.



## Instalación

El sistema utiliza pnpm como administrador de paquetes por lo que se debe tener instalado para realizarlo.

Se prefirió utilizar pnpm por el mejor manejo de espacio en disco duro y mejor tiempo de procesamiento.

En lo personal, prefieron usar pnpm y ahorrarme el diferencian npm de npx.


```bash
pnpm install
```

## Test

```bash
pnpm test
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


## Documentación

En la carpeta /docs se encuentra la información del proyecto.

[Contexto de negocio](./docs/contexto_negocio.MD) Con información recopilada para usar el lenguje común del mundo de las inversiones.

[Conversación Cursor](./docs/cursor_agent.md) Con la conversación con el agente de IA de cursor.

