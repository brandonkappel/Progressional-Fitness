import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service'
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: 'This is the first posts content'},
  //   {title: 'Second Post', content: 'This is the second posts content'},
  //   {title: 'Third Post', content: 'This is the third posts content'},
  // ]

  posts: Post[] = [];
  isLoading = false
  totalPosts = 0
  postsPerPage = 5
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10]
  private postsSub: Subscription;
  private authStatusSub: Subscription
  public userIsAuthenticated = false
  userId: string


  constructor(public postsService: PostsService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.isLoading = true
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId()
    this.postsSub = this.postsService.getPostUpdatedListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        this.isLoading = false
        this.totalPosts = postData.postCount
        this.posts = postData.posts;
      });
      this.userIsAuthenticated = this.authService.getIsAuth()
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated =>{
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId()
      });
  }


  onChangedPage(pageData: PageEvent) {
    this.isLoading = true
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);

  }

  onDelete(postId: string) {
    this.isLoading = true

    this.postsService.deletePost(postId).subscribe(()=>{
      this.postsService.getPosts(this.postsPerPage, this.currentPage)
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
