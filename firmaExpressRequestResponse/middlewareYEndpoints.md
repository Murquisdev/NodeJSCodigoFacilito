- [Middlewer](#middlewer)
  - [Ejemplo ilustrativo](#ejemplo-ilustrativo)
- [Endpoint](#endpoint)
  - [En términos técnicos](#en-términos-técnicos)
  - [Ejemplo](#ejemplo)
  - [Importancia de los _endpoints_](#importancia-de-los-endpoints)
  - [Ejemplo en **código**](#ejemplo-en-código)

# Middlewer

Se traduce literalmente como "intermediario" o "software intermedio". La idea central es que actúa como una capa entre dos aplicaciones o componentes de software, facilitando la comunicación y el intercambio de datos entre ellos.

En el contexto de Express.js, un **middleware** es una función que _intercepta_ las _solicitudes_ HTTP que llegan al _servidor_ _antes_ de que lleguen a su _manejador_ de ruta (route handler) final. Esta función tiene acceso a los objetos req (request, solicitud), res (response, respuesta) y a una función llamada next().

## Ejemplo ilustrativo:

Imagina un proceso de control de seguridad en un edificio.

1 - Llega una persona (solicitud): La persona quiere entrar al edificio.

2 - El guardia de seguridad (middleware): El guardia verifica la identificación de la persona, puede registrar su entrada, o incluso negarle la entrada si no cumple con los requisitos.

3 - La recepción (manejador de ruta): Si el guardia da el visto bueno, la persona pasa a la recepción para ser atendida.

En este ejemplo, el guardia de seguridad actúa como un middleware, realizando comprobaciones y acciones intermedias antes de que la persona llegue a su destino final (la recepción).

# Endpoint:

"Endpoint" (punto final) se refiere a la ubicación específica donde una API (Interfaces de Programación de Aplicaciones) o un servidor web espera recibir solicitudes y desde donde envía respuestas.

Para entenderlo mejor, podemos usar una analogía con una dirección postal:

- Servidor web/API: Es como un edificio con muchas oficinas.

- Endpoint: Es como el número de una oficina específica dentro del edificio.

- Solicitud (request): Es como una carta que se envía a una oficina específica.

- Respuesta (response): Es como la respuesta que se recibe de esa oficina.

## En términos técnicos:

Un **endpoint** es una URL (Uniform Resource Locator) específica que corresponde a una función o recurso particular en un servidor. _Define dónde se accede a un recurso y cómo se interactúa con él_.

Generalmente, un endpoint se compone de:

- URL base: La dirección principal del servidor (ej: https://www.ejemplo.com).

- Ruta (path): La parte de la URL que identifica el recurso específico (ej: /usuarios, /productos, /login).

- Método HTTP: La acción que se va a realizar sobre el recurso (ej: GET para obtener datos, POST para crear datos, PUT para actualizar datos, DELETE para eliminar datos).

## Ejemplo:

Consideremos una API para gestionar una tienda online.

- URL base: https://api.tiendaonline.com
  Endpoint para obtener la lista de productos: https://api.tiendaonline.com/productos (Método GET)

- Endpoint para obtener un producto específico: https://api.tiendaonline.com/productos/123 (Método GET, donde 123 es el ID del producto)

- Endpoint para crear un nuevo producto: https://api.tiendaonline.com/productos (Método POST)

En cada uno de estos casos, la URL completa (incluyendo la ruta y el método HTTP) define un endpoint diferente.

## Importancia de los endpoints:

- Organización y estructura: Los endpoints permiten organizar la funcionalidad de una API de forma lógica y estructurada.
- Comunicación clara: Definen claramente cómo interactuar con el servidor y qué tipo de solicitudes se esperan.
- Flexibilidad: Permiten acceder a diferentes recursos y realizar diferentes acciones a través de una misma API.

- Modularidad: Facilitan la creación de APIs modulares y escalables.

## Ejemplo en código

```javaScript
const express = require('express');
const app = express();

// Endpoint para la raíz (/) con método GET
app.get('/', (req, res) => {
  res.send('Bienvenido a la página principal');
});

// Endpoint para /productos con método GET
app.get('/productos', (req, res) => {
  res.json([{ nombre: 'Producto 1' }, { nombre: 'Producto 2' }]);
});

// Endpoint para /productos con método POST
app.post('/productos', (req, res) => {
  // Lógica para crear un nuevo producto
  res.send('Producto creado');
});

app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));
```

En este ejemplo, _/_, _/productos_ (con método _GET_) y _/productos_ (con método _POST_) son endpoints **distintos**.
