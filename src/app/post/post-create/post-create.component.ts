import { PostService } from './../post.service';
import { Post } from './../post.model';
import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  
  
  //@Output('çreatedPost') createdPost  = new EventEmitter<Post>();
  private mode = 'Create';
  private postId : any;
  public post : any;
  isLoading : boolean = false;

  constructor(public postService : PostService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      if(params.has('postId')){
        this.mode = 'edit';
        this.postId = <string>(params.get('postId') as unknown);
        this.isLoading = true;
        this.postService.getPostbyId(this.postId)
          .subscribe( postData =>{
            this.isLoading= false;
            this.post = { id : postData._id,title : postData.title,content : postData.content}
          })
        
      }
      else{
        this.mode = 'create';
        this.postId = '';
      }
    })
  }

  SavePost(form : NgForm){
    const postwa : Post = {
      id : '',
      title : form.value.title,
      content : form.value.content
    }
    //this.createdPost.emit(postwa);

    if(form.invalid){
      return;
    }

    this.isLoading = true;
    if(this.mode == 'create'){
      this.postService.setPosts(form.value.title,form.value.content)
    }
    else{
      this.postService.updatePost(this.postId,form.value.title,form.value.content)
    }
    
    form.resetForm();
    
  }

}
