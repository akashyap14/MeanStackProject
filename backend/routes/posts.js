const express = require('express');

const router = express.Router();
const Post = require('../models/post');


router.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    )
    next();
});

router.post('',(req,res,next)=>{
    const post = new Post({
        title : req.body.title,
        content : req.body.content
    })
    
    post.save()
    .then((result)=>{
        res.status(201).json({
            message : "Post added successfully",
            postId : result._id
        });
    
    })
    .catch((error)=>{
        console.log(error)
    }) 
})

router.put('/:id',(req,res,next)=>{
    const post = new Post({
        _id : req.body.id,
        title : req.body.title,
        content : req.body.content
    });
    Post.updateOne({_id : req.params.id},post).then(result=>{
        console.log(result);
        res.status(200).json({
            message : 'Updated successful!'
        })
    })
})

router.get('', (req,res,next)=>{
    
    Post.find().then((documents)=>{
        res.status(200).json({
            message : "Post fetched successfully",
            posts: documents
            
        })
    })
    

});

router.get('/:id',(req,res,next)=>{
    Post.findById(req.params.id).then(post =>{
        if(post){
            res.status(200).json(post)
        }
        else{
            res.status(404).json({message : 'Post not found'})
        }
    })
})

router.delete('/:id',(req,res,next)=>{
   Post.deleteOne({_id : req.params.id}).then(result => {
       console.log(result);
       res.status(200).json({
           message : 'Post deleted!'
       })

   })    
});

module.exports = router;