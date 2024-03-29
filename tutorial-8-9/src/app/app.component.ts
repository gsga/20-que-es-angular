import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Las variables públicas son accesibles desde fuera de la clase.
   * En particular, se pueden acceder desde el template de este
   * componente.
   * La variable nombre es interpolada en el template.
   */
  nombre = 'Bond. James Bond.';
  /**
   * Las variables private no son accesibles desde fuera de la clase.
   * En particular, no se pueden acceder desde el template de este
   * componente.
   * 
   * Estas dos variables se usan en el template, mediante el
   * mecanismo property binding.
   */
  private original = this.nombre;
  private modificado: boolean = false;
  /**
   * Intervalo de refresh en milisegundos. Es lo que el sistema
   * espera entre dos llamadas sucesivas de la función que pasamos
   * como argumento, que en este caso será una arrow function.
   */
  private refreshIntervalId;

  placeholder = "Escribí tu nombre...";
  disabled = true;

  constructor() {
    /**
     * El constructor de una clase se ejecuta cada vez que se crea una
     * nueva (new) instancia de esa clase. En este caso, es la clase del componente
     * raíz de la aplicación. La aplicación es una instancia de esta clase.
     * Se ejecuta al crearse la instancia de la aplicación. En nuestros ejemplos,
     * eso lo hacemos con el comando ng serve. También cuando refrescamos la 
     * página en el browser.
     * 
     * CUIDADO: en algunas entradas de los foros dicen que hay acá
     * un comportamiento controversial: la documentación dice una cosa
     * y el código hace otra.
     * La documentación ofrece dos alternativas. Una es la que estamos
     * usando acá, la arrow function. La otra es poner el nonbre de
     * una función de callback. 
     * Yo intenté poner el nombre de la función, y no lo pude hacer funcionar.
     * Una posible causa es que la documentación oficial es para JavaScript, y
     * acá estamos en TypeScript.
     * La alternativa que funciona es usar una arrow function
     * y que el cuerpo de esa arrow function sea el que llame a la función
     * que queremos llamar.
     * La arrow function es "() => this.modificar()", que es el primer
     * parámetro que le pasamos a la función setInterval().
     */
    this.refreshIntervalId = setInterval(() => this.modificar(), 3000);
  }

  // Esta es una función. En TypeScript no se pone la palabra function.
  private modificar() {
    if (!this.modificado) {
      this.modificado = true;
      this.nombre = this.nombre + " MODIFICADO";
    }
    else {
      this.modificado = false;
      this.nombre = this.original;
      // clearInterval(this.refreshIntervalId);
    }
    this.disabled = !this.disabled;
  }

  /**
   * Esta función es para el ejemplo de interpolación de función.
   * En el template, entre llaves dobles, hay un llamado a esta función.
   * En el llamado se le pasan dos argumentos. El llamado se
   * ejecuta, la función retorna el resultado, y ese resultado
   * es interpolado entre las dos llaves en el template.
   */
  suma(a: number, b: number) {
    return a + b;
  }
}
