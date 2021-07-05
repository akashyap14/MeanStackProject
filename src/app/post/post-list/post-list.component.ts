import { PostService } from './../post.service';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  // posts = [
  //   { title : "First post", content : "This is first post"},
  //   { title : "Second post", content : "This is second post"},
  //   { title : "Third post", content : "This is first post"},
  // ]
  @Input('posts') posts  : Post[]= [];
  postSub$ : Subscription;
  isLoading : boolean = false;

  constructor(public postService : PostService) {
    this.postService.getPost();
    this.isLoading = true;
    this.postSub$ = this.postService.getPostUpdateListner()
                      .subscribe((post)=>{
                        this.isLoading = false;
                        this.posts = post;
                      })
   }

  ngOnInit(): void {
    
  }

  ngOnDestroy(){
    this.postSub$.unsubscribe();
  }

  onPostDelete(postId : string){
    this.postService.deletePost(postId)
  }
  

}
