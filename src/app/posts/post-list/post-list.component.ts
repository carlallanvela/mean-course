import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private postSubscription: Subscription;

  // Think dependency injection of PostsService
  constructor(public postsService: PostsService) {}
  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postSubscription = this.postsService.getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    // Prevent memory leak
    this.postSubscription.unsubscribe();
  }

  onChangedPage(pageData: PageEvent) {
    // Index at 0 so we need to add 1
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    console.log(`On post-list.components.ts, deleting ` + postId);
    this.postsService.deletePost(postId);
  }
}
