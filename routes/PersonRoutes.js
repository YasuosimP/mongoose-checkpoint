const express=require('express')
const router=express.Router()
const person=require('../models/personSchema')
// Create and Save a Record of a Model:
router.post('/newperson', (req,res)=>{
    let newperson=new person(req.body)
    newperson.save((err,data)=>{
        err? console.log(err): res.send ('person was added')
    })
})
//Create Many Records with model.create()
person.create( {
    name: 'Fatma',
    age: 20,
    favoriteFoods:['pizza','cesar salade']
},
{
    name: 'dhia',
    age: 21,
    favoriteFoods:['Cats','soufflet']
},
{
    name: 'bara',
    age: 26,
    favoriteFoods:['ma9roudh','lasagna']
})
//Use model.find() to Search Your Database
router.get('/',(req,res)=>{
    person.find({},(err,data)=>{
        err? console.log(err): res.json(data)
    })
})
//Use model.findOne() to Return a Single Matching Document from Your Database
person.findOne({name:'Fatma'},(err,data)=>{
    err? console.log(err): console.log(data)
})

//Use model.findById() to Search Your Database By _id
router.get('/:id',(req,res)=>{
    person.findById({_id:req.params.id},(err,data)=>{
        err? console.log(err): res.json(data)
    })
})
//Perform Classic Updates by Running Find, Edit, then Save
router.get('/:id',(req,res)=>{
    person.findById({_id:req.params.id},(err,data)=>{
        err? console.log(err): res.json(data)
    })
    newperson.favoriteFoods.push('lasagna')
    newperson.save()
    
})
//Perform New Updates on a Document Using model.findOneAndUpdate()
person.findOneAndUpdate({name:'bara'},{age:20},{new:true},(err,data)=>{
    err? console.log(err): console.log(data)
})

//Delete One Document Using model.findByIdAndRemove
router.get('/:id',(req,res)=>{
person.findByIdAndRemove({_id:req.params.id},(err,data)=>{
    err? console.log(err): console.log(data)
})
})
//Delete Many Documents with model.remove()
const query=person.remove({name:'dhia'})
query.exec((err,data)=>{
    err? console.log(err) : console.log(data.deletedCount," data is deleted")
})

//Chain Search Query Helpers to Narrow Search Results
router.get('/',(req,res)=>{
    person.find({favoriteFoods:'Pizza'})
    .sort({name:1})
    .limit(2)
    .select({age:0})
    .exec((err,data)=>{
        err? console.log(err): console.log(data)
    })
})

module.exports=router