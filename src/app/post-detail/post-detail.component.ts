import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  ids = +this.route.snapshot.paramMap.get('id');
  title = "";

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
  }

  goBack(): void {
    this.location.back();
  }

}
