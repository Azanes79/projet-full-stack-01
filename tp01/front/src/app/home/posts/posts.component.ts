import { Component, OnInit } from '@angular/core';
import { Like } from '../../_shared/_models/like';
import { Post } from '../../_shared/_models/post';
import { User } from '../../_shared/_models/user';
import { SocketIoService } from '../../_shared/_services/io.service';
import { LikeService } from '../../_shared/_services/like.service';
import { PostService } from '../../_shared/_services/posts.service';
import { UserService } from '../../_shared/_services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  textToPost: string;
  posts: Post[];
  user = JSON.parse(localStorage.getItem('user'));
  users: User[];
  constructor(private postService: PostService, private likeService: LikeService, private userService: UserService, private ioService: SocketIoService) { }

  ngOnInit() {
    this.subscribeToPosts();
    this.postService.getPosts().subscribe(_res => {
      console.log(_res);
      this.posts = _res;
      this.posts.forEach(_post => {
        this.userService.getUsers().subscribe(_users => {
          this.users = _users;
          _post.user = _users.filter(_user => _user.FirebaseId === _post.FirebaseId)[0];
        })
      })
      this.likeService.getLikes(this.user.uid).subscribe(_res => {
        _res.forEach(_like => {
          this.posts.filter(_post => _post._id === _like.PostId)[0].isLike = true;
        })
      })
    });


  }


  sendPost() {
    const user = JSON.parse(localStorage.getItem('user'));
    const postTemp = new Post(this.textToPost, new Date(), user.uid);
    this.postService.postPosts(postTemp).subscribe(_res => {
      this.broadcastPost(postTemp)
      this.textToPost = '';
    })
  }

  public broadcastPost(post: Post): void {
    this.ioService.sendPostInformation(post);
  }

  private subscribeToPosts(): void {
    this.ioService.getPost()
      .subscribe((post: Post) => {
        console.log(post);
        post.user = this.users.filter(_user => _user.FirebaseId === post.FirebaseId)[0]
        this.posts.unshift(post);
      });
  }

  sendLike(post: Post) {
    this.likeService.postLike(new Like(post._id, this.user.uid)).subscribe(_res => {

    });
  }

  deleteLike(post: Post) {
    this.likeService.deleteLike(post._id, this.user.uid).subscribe(_res => {

    });
  }

}
