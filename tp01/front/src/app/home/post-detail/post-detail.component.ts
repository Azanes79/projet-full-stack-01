import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../_shared/_models/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  @Input() post: Post;
  @Output() like: EventEmitter<Post> = new EventEmitter<Post>();
  @Output() unlike: EventEmitter<Post> = new EventEmitter<Post>();
  constructor() { }

  ngOnInit() {
  }

  emitLike() {
    this.like.emit(this.post);
    this.post.isLike = true;
  }

  emitUnLike() {
    this.unlike.emit(this.post);
    this.post.isLike = false;
  }

}
