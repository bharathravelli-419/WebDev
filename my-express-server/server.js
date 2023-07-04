import express from 'express';

const app =express();
app.get("/",(req,res)=>{
    res.send("Hi Bharath");
    // res.sendFile("C:/Users/hp/Desktop/WB_Projects/personalWebsite/index.html",(err)=>{
    //     if(err)
    //     console.log(`the error is ${err}`);
    //     else
    //     console.log("Success Message");
    // })
    
})
app.get("/about",(req,res)=>{
    res.send(`<em>ravelli Bharath's About Page</em>`)
})

app.listen(3000,(err)=>{
    if(err)
    console.log(err)
    else
    console.log("Server is Running");
});