import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Post } from '../post.model'
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {


  enteredContent = "";
  enteredTitle = "";
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private postId: string
  post: Post;


  constructor(public postsService: PostsService, public route: ActivatedRoute, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "title": new FormControl(null, {
        validators: [Validators.required,
        Validators.minLength(3)]
      }),
      "content": new FormControl(null, {
        validators: [Validators.required]
      }),
      // image: new FormControl(null, {
      //   validators: [Validators.required],
      //   asyncValidators: [mimeType]
      // })

    });
    this.route.paramMap.subscribe((ParamMap: ParamMap) => {
      if (ParamMap.has('postId')) {
        this.mode = 'edit';
        this.postId = ParamMap.get('postId')
        this.isLoading = true
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            creator: postData.creator
          };
          this.form.setValue({
            'title': this.post.title,
            'content': this.post.content
          });
        })
      } else {
        this.mode = 'create';
        this.postId = null
      }
    });
  }

  onImagePicked(event: Event ) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file
    });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
      console.error(this.imagePreview)
    };
    reader.readAsDataURL(file);

//reference lecture 77 - 79

  }

  onSavePost() {
    if (this.form.invalid) {
      console.error(this.form)
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
      this.snackBar.open("Successfully Created Post", "", { duration: 2000, verticalPosition: "top" })

    } else {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content)
      this.snackBar.open("Successfully Update Post", "", { duration: 2000, verticalPosition: "top" })
    }

    // this.router.navigateByUrl('')
    this.form.reset();
  }

}
