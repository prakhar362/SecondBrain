//TypeScript follows ES6 Module System so use only import and export
import express from "express"
const app=express();

app.get('/',(req,res)=>{
    res.send("Server working test");
})

app.listen(3000,()=>{
    console.log('Server running on http://localhost:3000')
})