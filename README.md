

ANOTACIONES ANGULAR

****
Hacer el deploy
ng build --prod --aot


***|
listo para una carpeta listado-personas
ng build --prod --aot --base-href /listado-personas/


****
Ejecutar app
ng serve -o


Crear componente
ng g c xxxxxx


****
Instalar bootstrap,jquery,popper
npm install bootstrap --save
npm install jquery --save
npm install popper.js --save


****
two way binding, toma lo que viene del ts pasa lo que se ingrese al html en doble via
[(ngModel)]=""    <-- Solo ngModel lee los datos para luego si pasarlos, usado en login -->
o tambien se puede utilizar localReference
#apellidoInput asi van en los input y se pasan al metodo onAgregarPersona(nombreInput,apellidoInput)
para luego utilizar en el ts asi:
onAgregarPersona(nombreInput: HTMLInputElement, apellidoInput: HTMLInputElement): void {

***
Evento que envia lo que se ingrese en el input, al metodo escrito
 (input)="onModificarPersona($event)"


***
Envia desde el componente padre al hijo
@Input() persona: Persona;


***
Envia desde el componente hijo al padre
@Output() personaCreada = new EventEmitter<Persona>();


***
Crear un modulo
ng g m components/components --flat


***
Crear un modulo de routing
ng g module app-routing --flat


***
Redireccionar y pasar datos con databinding de un respectivo indice
[routerLink]="['/personas',indice]"


***
Enviar queryparams para saber si es edicion o nuevo en el mismo link del boton
[queryParams]="{modoEdicion:'1'}"


***
Instalar firebase con complemento firestore
npm install firebase @angular/fire --save

****
Flash Messages
npm install angular2-flash-messages --save

***
Crear archivo de app-routing
ng g module app-routing


***
Crear una clase 
ng g class usuarios/usuario

***
Crear un servicio
ng g s usuarios/auth


***
Crear un guarda
ng g g usuarios/guards/auth


****
Despliegue en produccion
ng build --prod


****
nuevo tomado del curso angular 10
angular 


manejo de fechas
instalar localize
ng add @angular/localize


manejo de capitalize
ng g p pipes/capitalizado


manejo de domseguro
ng g p pipes/domseguro


manejo de componentes con archivo ts unico inline
ng g c components/css -it -is


manejo de directivas
ng g d directives/resaltado


****
con angular material
instalar npm install --save hammerjs


****
especificar en donde deseo crear el componente
ng g c components/mapa --module=app.module


simulacion de que archivos va a crear
ng g s services/user --dry-run

