const express = require('express');
const Post = require('../schemas/Post');

const post_router = express.Router();

// get all posts
post_router.get("/", async (req,res)=>{
    try{
        const result = await Post.find({});
        if(result !== null){
         return res.status(200).send({posts: result});
        }
    }catch(exp){
        console.log(exp.message);
    }
  
})

// create a new post

post_router.post("/new-post", async (req,res)=>{
    const  post = req.body;
    try{
        const  new_post = new Post(post);
        const result = await new_post.save();
        if(result !== null){
         return res.status(201).send({post: result});
        }
    }catch(exp){
        console.log(exp.message);
    }
  
})
// add a new col to post schema by id

// post_router.put("/post/:id", async (req,res)=>{
//     const  reaction = req.body;
//     console.log("reaction", reaction)
//     const id = req.params.id;
//     try{
        
//         const result = Post.update({_id:id}, {
//             $set:{
//                 "reaction": 1
//             }
//         })
//         console.log("result: ", result);
//         if(result !== null){
//          return res.status(200).send({messg: "updated successfully", post: result});
//         }
//     }catch(exp){
//         console.log(exp.message);
//     }
  
// })
// update a post

post_router.put("/post/:id", async (req,res)=>{
    const  reaction = req.body;
    console.log("reaction", reaction)
    const id = req.params.id;
    try{
        
        const result = Post.updateOne({_id:id}, {
            $set:{
                "reaction": reaction
            }
        })
        console.log("result: ", result);
        if(result !== null){
         return res.status(200).send({messg: "updated successfully", post: result});
        }
    }catch(exp){
        console.log(exp.message);
    }
  
})
module.exports = post_router;