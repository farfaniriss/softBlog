import { Component, OnInit } from '@angular/core';
import { Post } from '../post'

import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public entries: Observable<any[]>;

  posts = [
    new Post(1,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'fashion','https://data.whicdn.com/images/293583545/large.jpg'),
    new Post(2,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'beauty', 'https://data.whicdn.com/images/297504200/large.jpg'),
    new Post(3,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'travel', 'https://data.whicdn.com/images/295470198/large.jpg'),
    new Post(4,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'healthy', 'https://data.whicdn.com/images/297083770/large.jpg'),
  ]

  constructor(db: AngularFirestore) {
      this.entries = db.collection<Post>('/posts', ref => ref.orderBy('id')).valueChanges();
   }

  ngOnInit() { 
  }
}
