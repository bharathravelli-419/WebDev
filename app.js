const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { rmSync } = require('fs');

const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const main =async()=>{
   try{
    await mongoose.connect("mongodb://127.0.0.1:27017/articlesDB");
    console.log("Connected to articlesDB");
   }
   catch(err){
    console.log('The error is : ',err);
   }
}

main();

const articleSchema = {
    name:String,
    content:String
}
const article = mongoose.model('article',articleSchema);

app.route("/articles")
.get(async(req,res)=>{
    const result = await article.find({});
    res.send(result);  

})
.post(async(req,res)=>{
   
    const name = req.body.name;
    const content = req.body.content;
    
    const newArticle = new article({
        name : name,
        content : content
    })
    try{
        await newArticle.save();
        res.send('Data Saved Successfully !!')
    }
    catch(err){
        res.send(err);
    }


})
.delete(async(req,res)=>{
    try{
        await article.deleteMany();
        res.send('Deleted all records Successfully');
    }
    catch(err){
        res.send(err);
    }

})

app.route('/articles/:articleName')
.get(async(req,res)=>{

    try{
        const result = await article.findOne({name:req.params.articleName});
        if(result){
            res.send(result);
        }else{
            res.send('No such records found');
        }
    }
    catch(err){
        res.send(err);
    }

})
.put(async(req,res)=>{
    try{
          await article.findOneAndUpdate({name:req.params.articleName},{name:req.body.name,content:req.body.content},{overwrite:true});
          res.send("updated successfully");
    }
    catch(err){
        res.send(err);

    }


})
.patch(async(req,res)=>{
    try{
        await article.findOneAndUpdate({name:req.params.articleName},{$set:{name:req.body.name,content:req.body.content}});
        res.send("updated successfully");
  }
  catch(err){
      res.send(err);

  }

})
.delete(async(req,res)=>{
    try{
        await article.deleteOne({name:req.params.articleName});
        res.send("deleted Successfully")
    }
    catch(err){
         res.send(err);
    }

})


app.listen(process.env.PORT || 3000,(err)=>{
    if(err)
    console.log(err);
    else
    console.log('Server Running');
})