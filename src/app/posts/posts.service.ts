import { Post } from './post.model'
import { HttpClient } from '@angular/common/http'

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const url = environment.apiUrl + "/posts/"

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[], postCount: number }>()

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, posts: any, maxPosts: number }>(
      url + queryParams)
      .pipe(map((postData) => {
        return {
          posts: postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              creator: post.creator
            };
          }), maxPosts: postData.maxPosts
        };
      }))
      .subscribe((transformedPostData) => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({ posts: [...this.posts], postCount: transformedPostData.maxPosts });
      });
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string, creator: string }>(url + id);
  }

  addPost(post) {
    console.error(post)
    // console.error(title, content)
    //need to fix adding image, reference lectur 77-79
    const postData = new FormData();
    // postData.append("title", title)
    // postData.append("content", content)
    // postData.append("image", image, title)
    // const post ={title: title, content: content}
    console.error(post)
    console.error(postData)
    

    this.http.post<{ message: string, postId: any }>(url, post)
      .subscribe((responseData) => {
        console.error('POST:', responseData)
        this.router.navigate(["/"])
      });

  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content, creator: null };
    this.http.put(url + id, post)
      .subscribe(response => {

        this.router.navigate(["/"])

      })
  }

  deletePost(postId: string) {
    return this.http.delete(url + postId)

  }

}
