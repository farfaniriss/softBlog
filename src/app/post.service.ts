import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from './post';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  private dataSource = new BehaviorSubject(new Post(0, '', '', '', ''));
  post = this.dataSource.asObservable();

  constructor() { }

  updatePostSelection(post: Post){
    this.dataSource.next(post);
  }
}
