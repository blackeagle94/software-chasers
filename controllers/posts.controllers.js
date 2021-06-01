const PostsModel = require('../model/Post.model')

exports.getAll = async (req, res) => {
    try {
        const {page = 1, limit=5} = req.query
        const response = await PostsModel.find().limit(limit * 1).skip((page - 1) * limit)
        res.json({total:response.length, response})
    } catch (e) {
        res.status(500).json(e)
    }
    const {page = 1, limit=5} = req.query
    PostsModel.aggregate([
        {
            $skip: (page -1) * limit
        },
        {
            $limit:limit*1
        },
        {
            $project: {title:true, author: 1, userId:true}
        },
        {
            $sort: {title: -1}
        }
       
    ], (err, result) => {
        if(err) {
            res.status(500).json(err)
        } else {
            res.json({total:result.length, result})
        }
    })
}

exports.create = async (req, res) => {
    const newPost = await new PostsModel({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        userId:req.body.userId
    })

    newPost.save().then(response => res.json({message:'Post Created', response})).catch(err => res.json(err))
}

exports.getSinglePost = async (req, res) => {
   await PostsModel.findById({_id: req.params.postid}, (err, data) => {
       if(err) {
        res.json({message: err})
       } else {
           res.json(data)
       }
   })
}


exports.getSinglePostByTitle = async (req, res) => {
    await PostsModel.findOne({title: req.params.titlename}, (err, data) => {
        if(err) {
         res.json({message: err})
        } else {
            res.json(data)
        }
    })
 }


 exports.updateSinglePost = async (req, res) => {
     await PostsModel.findByIdAndUpdate({_id: req.params.postid}, {$set: req.body})
     .then(data => res.json(data))
     .catch(err => res.json({message: err}))
 }


 exports.removeSinglePost = async (req, res) => {
     await PostsModel.findByIdAndDelete({_id: req.params.postid})
     .then(data => res.json(data))
     .catch(err => res.json({message: err}))
 }
