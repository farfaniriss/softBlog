import { Component, OnInit } from '@angular/core';
import { Post } from '../post'

import { Observable } from 'rxjs'
import { PostService } from '../post.service'

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public entries: Observable<Post[]>;
  ready = false;
  
  constructor(public postService: PostService) {
    
   }

  ngOnInit() { 
    this.postService.getPostsInit()
    this.loadImage();
  }

  onScroll () {
    this.postService.getMorePosts()
  }

  goPost(post: Post){
    this.postService.updatePostSelection(post);
  }

  loadImage(){
    let img = new Image();
    img.src = "https://data.whicdn.com/images/297083770/large.jpg";
    img.onload = () =>  this.ready = true;
  } 
}