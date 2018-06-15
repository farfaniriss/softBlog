import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  categories = ['Arte y entretenimiento', 'Deporte', 'Eventos', 'Recetas', 'Viajes'];


}