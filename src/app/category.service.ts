import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from "./category";

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public db: AngularFirestore) { }

  getCategories() : Observable<Category[]>{
    return this.db.collection<Category>('categories').valueChanges()
  }

}
