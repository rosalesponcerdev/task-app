# Mi Aplicación Angular 17

Esta es una aplicación desarrollada con Angular 17. Utiliza NgRx para el manejo del estado y Jest para las pruebas.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 18 o superior)

- [Angular CLI](https://angular.io/cli) (versión 17)

# Checklist de Desarrollo

## Crear una aplicación con Angular (7 en adelante)

- [x] Crear una nueva aplicación Angular
- [x] Configurar Bootstrap para la maquetación
- [x] Definir estilos (colores, tamaños de texto, formularios, etc.) a criterio

## Página Login

- [x] Crear un formulario con los siguientes campos y etiquetas:
- [x] **Usuario**: Campo de texto con etiqueta "Usuario"
- [x] **Contraseña**: Campo de texto con etiqueta "Contraseña"
- [x] **Botón "Ingresar"**: Al hacer clic, debe verificar si los datos son correctos y redirigir a la pantalla de "Tareas"
- [x] OPCIONAL PLUS: Guardar los datos en el store (NgRx)

## Pantalla de Tareas

- [x] Crear un formulario con un solo input
- [x] El input debe aceptar solo caracteres alfanuméricos
- [x] **Botón "Agregar"** y la tecla "Enter" deben agregar la tarea a la lista y limpiar el input
- [x] Lista de tareas
- [x] Al agregar una tarea, el check debe estar desactivado
- [x] El botón "X" debe estar presente para eliminar la tarea
- [x] Al activar el check, el botón "X" debe quedar oculto, imposibilitando la eliminación de la tarea
- [x] OPCIONAL PLUS: Consumir el usuario autenticado y mostrarlo en la parte superior de la pantalla
