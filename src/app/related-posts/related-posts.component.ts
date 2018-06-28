import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post'
import { PostService } from '../post.service'

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-related-posts',
  templateUrl: './related-posts.component.html',
  styleUrls: ['./related-posts.component.scss']
})
export class RelatedPostsComponent implements OnInit {

  @Input() posts: Observable<Post[]>;

  constructor(private data: PostService) { }

  ngOnInit() {
  }

  goPost(post: Post){
    this.data.updatePostSelection(post);
  }

}
