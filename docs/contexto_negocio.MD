# Documentación: Identificación de Activos y Registro de Propiedad en Inversiones

Necesito de esta inforamción para entender mejor cómo funcionan las bolsas de valores y tomar mejores decisiones de cómo implementar las funcionalidades solicitadas en el desafío.

Generado con conversación con Gémini https://docs.google.com/document/d/1YqzY7Pqwg7fykz29Wel5v_2jmFWZr4JFO71aTfxiUXo/edit?usp=sharing

Esta sección detalla cómo se identifican los valores negociables en una bolsa de valores y la naturaleza del registro de propiedad al adquirir acciones.

---

## 1. Identificadores Únicos de Activos
Para garantizar la precisión en las transacciones internacionales y evitar confusiones entre emisores, se utilizan tres estándares principales:

| Identificador | Nombre Completo | Ámbito | Ejemplo (Microsoft) |
| :--- | :--- | :--- | :--- |
| **Ticker** | Símbolo de Cotización | Local (Bolsa específica) | `MSFT` |
| **ISIN** | International Securities Identification Number | Global (Estándar ISO) | `US5949181045` |
| **CUSIP** | Committee on Uniform Securities Identification Procedures | Regional (EE.UU. y Canadá) | `594918104` |

> **Nota:** El código **ISIN** es el identificador más robusto, ya que permite la liquidación de activos entre diferentes países y custodios sin ambigüedad.

---

## 2. Naturaleza de la Adquisición: ¿Cantidad o ID Único?

En el sistema financiero moderno, la propiedad de acciones no se gestiona mediante identificadores individuales por cada título (como números de serie), sino mediante **Anotaciones en Cuenta**.

### Características del Registro:
* **Desmaterialización:** Las acciones físicas han sido reemplazadas por registros digitales centralizados.
* **Registro por Cantidad:** Al ejecutar una compra, el sistema acredita una **cantidad de unidades** de un activo (identificado por su ISIN/Ticker) a favor del titular en los libros del custodio.
* **Prueba de Propiedad:** El inversor no recibe un ID por cada acción, sino un **Número de Folio o ID de Transacción** que certifica la operación de compra.

### Estructura de un Comprobante de Compra:
Un registro de transacción estándar en el portafolio debe contener, como mínimo:
1. **ID de Transacción:** Identificador único del movimiento contable.
2. **Activo:** Ticker e ISIN de la empresa.
3. **Cantidad:** Número de unidades adquiridas.
4. **Precio:** Valor unitario de ejecución.
5. **Fecha y Hora:** Timestamp de la operación en el mercado.

---

## 3. Entidades de Custodia
La integridad de estas cantidades está garantizada por entidades de custodia (ej. Indeval, DCV, Euroclear), que actúan como el libro mayor definitivo, asegurando que la suma de las cantidades registradas coincida con el capital social emitido por la empresa.