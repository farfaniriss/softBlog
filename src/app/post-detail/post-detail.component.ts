import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PostService } from '../post.service';
import { Post } from '../post';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  ids = +this.route.snapshot.paramMap.get('id');
  title = "";
  post:Post;
  public entries: Observable<Post[]>;
  relatedPosts: Observable<Post[]>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private data: PostService
  ) {  }

  ngOnInit() {
     this.data.post.subscribe(post => { this.post = post })
     this.getRelatedPosts()
    //  this.entries = this.db.collection<Post>('/post-details', ref => ref.where('id', '==', this.ids)).valueChanges()
  }

  goBack(): void {
    this.location.back();
  }

  getRelatedPosts(): void {
    this.relatedPosts = this.data.getRelatedPosts(this.post.category);
    console.log(this.post.category);
  }

}