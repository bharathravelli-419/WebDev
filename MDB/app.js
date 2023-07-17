// getting-started.js
const { MongoTopologyClosedError } = require('mongodb');
const mongoose = require('mongoose');

// main().catch(err => console.log(err));

async function main() {
 try{
  await mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');
  console.log("CONNECTION is success");
 }
 catch(err){
  console.log(err);
 }



  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()

const fruitSchema = new mongoose.Schema({
  name: String,
  rating:{
    type:Number,
    min:1,
    max:10
  },
  review:String
});
const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit = new Fruit({
  name:"Grapes",
  rating:8,
  review:"Grapes are not the king of fruits"
})

// fruit.save()
const personSchema = new mongoose.Schema(
  {
    name :{
      type:String,
      required:[true,'Should have a name']
    },
    age:Number,
    favFruite:fruitSchema

  }
)
const Person = mongoose.model("Persons",personSchema);

const person = new Person({
  name :'Tejaswi',
  age:24,
  favFruite:fruit
})

//  person.save();

// const res = async ()=>{
 
//  const arr = await Fruit.find();
//  arr.forEach(fruit=>{
//   console.log(fruit.name);
//  })
//  //mongoose.connection.close();
// }
// res()

const res = async ()=>{
 
  const arr = await Person.find();
  arr.forEach(person=>{
   console.log(person.name,person.age,person.favFruite);
  })
//  mongoose.connection.close();
 }

//  const updateAge =async ()=>{
// await  Person.updateOne({name:'Bharath'},{age:21})

//  }
//  updateAge();
// const del = async ()=> await Person.deleteOne({name:'Tejaswi'});
// del()
 res()