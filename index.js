import express from "express";
import BankBranchModel from "./models/BankBranchModel.js"
import mongoose from 'mongoose'

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("DB Connected"))


const app=express()

app.get("/",(req,res)=>{
    res.send({mess:"Hello Wsdorld!"})
})

app.get("/api/getInfo",(req,res)=>{
    res.send({mess:"Hello World!"})
})



app.get("/api/branch",async(req,res)=>{
  var limit=parseInt(req.query.limit)
  var offset=parseInt(req.query.offset)
  var str=req.query.q
  var reg=new RegExp("^.*"+str+".*$")

  var output=await BankBranchModel.find({"branch": {$regex: reg}},{_id: 0,bank_name:0,__v:0}).sort({"ifsc":1}).skip(offset).limit(limit)
  console.log(output)
  res.send({branches:output})
})

app.get("/api/search",async(req,res)=>{
  var limit=parseInt(req.query.limit)
  var offset=parseInt(req.query.offset)
  var str=req.query.q
  var reg=new RegExp("^.*"+str+".*$","i")

  var output=await BankBranchModel.find({$or:[{"branch": {$regex: reg}},{"bank_id": {$regex: reg}},{"ifsc": {$regex: reg}},{"address": {$regex: reg}},{"city": {$regex: reg}},{"district": {$regex: reg}},{"state": {$regex: reg}},{"bank_name": {$regex: reg}}]},{_id: 0,bank_name:0,__v:0}).sort({"ifsc":1}).skip(offset).limit(limit)
  console.log(output)
  res.send({branches:output})
})


app.listen(process.env.PORT || 3000,()=>{
    console.log("Running...")
})

