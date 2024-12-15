# Programación asíncrona

JavaScript es **monohilo**, esto quiere decir que solo tiene un lugar donde ejecutar las operaciones. Si hay una operación que requiera de mucho tiempo, la ejecución del programa quedaría parada hasta que esta se resuelva.

Para solucionar esta situación, JS tiene una naturaleza **asíncrona**, lo que permite ejecutar tareas mientras se espera a que otras terminen.

- **Callbacks**: Fue la primera forma de controlar la respuesta asíncrona en JS y es fácil crear los llamados callbacks hell. Las 2 siguientes son los que se denomína _azúcar sintáctico_, a bajo nivel se basan en los callbacks para funcionar.
- **Promesas**: Es una forma más legible y facil de mantener que la anterior.
- **Async / Await**: Permite escribir código que parece síncrono, pero es asíncrono.
