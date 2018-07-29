import { Component, OnInit } from '@angular/core';
import { CategoryService } from "./category.service";
import { Category } from './category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  categories = ['Arte y entretenimiento', 'Deporte', 'Eventos', 'Recetas', 'Viajes'];

  category$: Observable<Category[]>;
  constructor(public categoryService: CategoryService){}

  ngOnInit(){
    this.category$ = this.categoryService.getCategories();
  }

}