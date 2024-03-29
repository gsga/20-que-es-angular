import { Component, OnInit, Input } from '@angular/core';
import { ServicioFavoritosService } from '../servicio-favoritos.service';

/**
 * https://angular.io/api/core/Component
 * El decorador @Component marca una clase como un componente Angular 
 * y proporciona metadatos de configuración que determinan cómo se 
 * debe procesar, crear instancias y usar el componente en 
 * tiempo de ejecución.
 */
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  /** El signo de pregunta significa que la variable image podría eventualmente
   * no estar presente. En este caso no tendríamos un error.
   * Si está presente, debe ser de tipo string.
   * 
   * Notar que las propiedades del componente Card son iguales a las de la
   * propiedad tarjetas del componente raíz, que son a su vez las propiedades
   * de la interfaz Tarjeta. Son tres cosas distintas, las tres son necesarias,
   * cada una de ellas cumple una función diferente.
   * Para decirlo explícitamente, aunque tienen las mismas propiedades,
   * el componente Card no es la variable tarjetas.
   */
  public image?: string;
  public titulo: string = "";
  public subtitulo: string = "";
  /**
   * https://angular.io/api/core/Input
   * Los decoradores @Input() y @Output() son mecanismos para intercambiar datos entre componentes.
   * @Input() se usa para recibir datos. Es decir, el componente tiene la capacidad de recibir
   * los datos, tiene una variable destinada a guardarlos, pero no tiene de entrada el contenido,
   * el valor de la variable. Ese valor es lo que tiene que recibir como input. Ese dato
   * puede venir de una acción del usuario, o bien como resultado de un método que se ejecutó,
   * quizá gatillado por un evento. En todo caso, es algo que el componente espera, que no lo tiene,
   * y que lo recibe desde afuera.
   * La sintaxis más general es:
   * @Input(nombre_optativo_para_usar_en_el_template) nombre_de_la_variable:tipo_de_la_variable
   * En este caso, no hay nada entre los paréntesis después de @Input, o sea que no estamos 
   * dando un nombre para el template, de modo que en el template
   * vamos a usar el mismo nombre de la variable, que en este caso es dataEntrante.
   * :any declara que la variable puede ser de cualquier tipo de datos.
   * 
   * Resumiendo todo lo anterior:
   * 
   * dataEntrante es una propiedad de esta clase, que es CardComponent.
   * Esta propiedad admite datos de cualquier (any) tipo.
   * Pero no los tiene de entrada, sino que espera recibirlos (@Input).
   * Esos datos, el componente los recibe cuando el componente principal
   * de la aplicación usa la directiva *ngFor para recorrer el array de
   * datos. Angular toma cada uno de esos ítems del array, y lo
   * pone a disposición del componente Card, inyectándolo en la variable
   * dataEntrante.
   * 
   * A la vista de toda la discusión anterior, se entiende por qué la documentación
   * oficial de Angular dice que el decorador @Input() permite que el componente hijo
   * reciba información desde el componente padre.
   */
  @Input() dataEntrante: any;

  /**
   * Uno de los modos en que se implementa el patrón de inyección
   * de dependencias es este: por medio de un constructor.
   * El parámetro servicioFavorito que se pasa al constructor
   * de la clase CardComponent es lo que se inyecta.
   * Concretamente, estamos inyectando en la clase CardComponent la dependencia de la
   * clase ServicioFavoritosService. Esa dependencia está disponible para ser inyectada
   * en toda la aplicación.
   */
  constructor(private servicioFavorito: ServicioFavoritosService) { }

  ngOnInit(): void {
  }

  /**
   * Este es el método llamado por el evento click() del botón que está en
   * el template de este componente.
   * Se ha usado event binding e inyección de dependencias.
   * 
   * this es una palabra reservada, que retorna una referencia a esta instancia
   * de esta clase, es decir a este objeto en el que estoy ahora.
   * 
   * this.servicioFavorito es la instancia de la clase ServicioFavoritosService
   * que está en la propiedad servicioFavorito de este objeto. 
   * Notar que la clase CardComponent no declara la propiedad servicioFavorito. 
   * Lo único que hay es que el constructor de la clase CardComponent
   * recibe como argumento "private servicioFavorito: ServicioFavoritosService".
   * Y esto es una inyección de dependencia. El objeto servicioFavorito
   * aparece como una propiedad de esta instancia de la clase CardComponent,
   * perfectamente inicializado y listo para usar. Acá simplemente lo usamos.
   * 
   * this.servicioFavorito.diparadorFavoritos es la propiedad diparadorFavoritos
   * del objeto this.servicioFavorito.
   * Esa propiedad es de tipo EventEmitter<any>.
   * https://angular.io/api/core/EventEmitter
   * Se usa en componentes con la directiva @Output para emitir eventos personalizados 
   * de forma síncrona o asíncrona, y registra controladores para esos eventos 
   * que estén suscritos a una instancia.
   * En otras palabras, es un emisor de eventos, y para eso se usa el método emit().
   * 
   * El parámetro que toma emit() como argumento es el valor a emitir. En este caso,
   * es un objeto de JavaScript.
   * https://www.w3schools.com/js/js_objects.asp
   * Tiene una propiedad llamada data, y el valor de esa propiedad es this.dataEntrante, que
   * está marcada con el decorador @Input. 
   */
  AgregarAFavorito() {
    this.servicioFavorito.diparadorFavoritos.emit(
      { data: this.dataEntrante }
    )
  }
}
