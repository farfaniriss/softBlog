import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  ids = +this.route.snapshot.paramMap.get('id');
  title = "";
  post:Post;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private data: PostService
  ) { }

  ngOnInit() {
    this.data.post.subscribe(post => {this.post = post})
  }

  goBack(): void {
    this.location.back();
  }

}
