const express = require('express');
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const date = require(__dirname+'/date.js')


//Declaring Global array of workList
const workList=[];
//Declaring Global array
var newItemsList =[]

//application creation
const app = express();

//setting app view engine to ejs
app.set("view engine","ejs");

//using body-parser
app.use(bodyParser.urlencoded({extended:true}));

//setting static files in public folder
app.use(express.static('public'));

// ---------------DATA BASE CONNECTION and DB CODE ----------------------------

const main = async () => {

    try{
      await  mongoose.connect('mongodb://127.0.0.1:27017/TodoListDB');
        console.log("Connected To TodoListDB successful");
    }
    catch(error)
    {
        console.log("error while connecting to TodoListDB ");
    }
}
main()

const ItemSchema = new mongoose.Schema({
    name :{
        type:String,
        required: true
    }
});

//Saving the collections name
const Item = mongoose.model('Item',ItemSchema);

//item1.save();

// LIST SCHEMA and MODEL

const listSchema = new mongoose.Schema({
    name:String,
    items: [ItemSchema]
})

const list = mongoose.model("list",listSchema);




//  -------- HOME ROUTES----------

//----------------Custom routes using route parameters----------------- 
app.get("/:customListName",async (req,res)=>{
    var route_name = req.params.customListName;
    route_name = route_name.toLowerCase();
  var list_document = await list.findOne({name:route_name});
  if(list_document === null){
    const list_1 = new list({
       name:route_name,
       items:[]
    })
    await list_1.save();
    res.redirect("/"+route_name);

  }else{
    console.log(list_document,list_document.name);

    res.render('list',{day:list_document.name,newItemsList:list_document.items});

  }
  
   // console.log(newItemsList,typeof(newItemsList));
   
  
});





//HOME POST ROUTE
app.post("/",async (req,res)=>{
   console.log(req.body);
    newItemsList.push(req.body.newItem);
    
    const list_doc = await list.findOne({name:req.body.list_Name});
    
    const item1 = new Item(
    {
        name :req.body.newItem
    }
)
 await item1.save();
 list_doc.items.push(item1);
 await list_doc.save();
    res.redirect("/"+list_doc.name);
})

app.post("/delete",async (req,res)=>{
    console.log(req.body.chkbox);
    console.log(req.body.listName);
   await list.findOneAndUpdate({name :req.body.listName},{$pull :{items:{_id:req.body.chkbox}}},
   {new:true} );
    res.redirect("/"+req.body.listName);
})













//----------------- server running code  ----------------------------
app.listen(process.env.PORT || 3000,(err)=>{
    if(err)
    console.log('error encountered');
    else
    console.log('Success 💯💯');
})
