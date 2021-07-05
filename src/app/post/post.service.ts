import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts : Post[] = [];
  postsUpdated = new Subject<Post[]>();
  headers = { 'Content-Type' : 'application/json' };
  constructor(private _http : HttpClient, private router : Router) { }



  getPost(){
    this._http.get<{message:string,posts : any}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
          return postData.posts.map((postwa : any)=> {
            return {
              title : postwa.title,
              content : postwa.content,
              id : postwa._id
            }
          })
        }))
        .subscribe((transformedPost)=>{
          this.posts = transformedPost;
          this.postsUpdated.next([...this.posts]);
          
        })
  }

  getPostUpdateListner(){
    return this.postsUpdated.asObservable();
  }

  getPostbyId(id: string){
    
    return this._http.get<{_id : string,title : string, content : string}>(`http://localhost:3000/api/posts/${id}`)
  }

  setPosts(title : string,content:string){

    const post : Post = {id : '',title : title,content : content}
    this._http.post<{message :string, postId : string}>('http://localhost:3000/api/posts',post)
            .subscribe((responseData)=>{
              post.id = responseData.postId;
              this.posts.push(post);
              this.postsUpdated.next([...this.posts])
              this.router.navigate(["/"]);
            })

    
  };

  updatePost(id:string,title : string,content : string){
    const post : Post = { id : id, title : title, content : content};
    this._http.put(`http://localhost:3000/api/posts/${id}`,post)
          .subscribe((response)=>{
            const updatedPosts = [...this.posts];
            const oldPostIndex = updatedPosts.findIndex(p=> p.id == post.id);
            updatedPosts[oldPostIndex] = post;
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(["/"]);
          })

  }



  deletePost(postId : string){
    this._http.delete(`http://localhost:3000/api/posts/${postId}`)
      .subscribe(()=>{
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        console.log('Deleted');
      })

  }
}
