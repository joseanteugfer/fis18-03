# OrdenesPagoApp


## URL a postman
[URL](https://documenter.getpostman.com/view/2609249/RznFpJKg) aquí tenemos todos los metodos de la API implementados

## Aspectos de nivel avanzado

Pruebas de interfaz de usuario con selenium: Ejecuta las pruebas de manera manual pasandole una serie de valores, adjuntamos una serie de videos donde se observa el funcionamiento. El código podemos encontrar en test>selenium

Integración con el microservicio de facturas: Nos integramos para comprobar si una orden de pago puede ser ejecutada o no, comprobamos si la orden tiene una cantidad valida para la factura. Metodo onChange de editable-orden.component.ts

Pruebas con Mocks y Stubs estas pruebas avanzadas las utilizamos en server.test.js dentro de la carpeta test

Validaciones de frontEnd: en editable orden comprobamos que el campo cantidad y el IBAN sean aptos, ademas en el código html de ordenesPago.component validamos el formulario con campos de sololectura y campos requeridos

Finalmente en la carpeta información ubicada en la raiz, encontramos la presentación y los videos de selenium.




This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
