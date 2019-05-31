import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSubscription: Subscription;

  // Think dependency injection of PostsService
  constructor(public postsService: PostsService) {}
  ngOnInit() {
    this.posts  = this.postsService.getPosts();
    this.postSubscription = this.postsService.getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    // Prevent memory leak
    this.postSubscription.unsubscribe();
  }
}
