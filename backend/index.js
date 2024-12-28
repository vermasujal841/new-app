const express=require("express");
const { createTodo, updateTodo } = require("./types");
const app= express();
const port =3000;
const {Todo}=require("../backend/db")
const cors = require("cors");
app.use(cors({}));

app.use(express.json());

app.get("/todos",async function(req,res){
    const todos= await Todo.find({});
    res.status(200).json({
        todos
    })
});
app.post("/todo",async function (req,res){
    const createPayload=req.body;
    const parsedPayload=createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"you sent a wrong input"
        })
        return;
    }
    await Todo.create({
        title:createPayload.title,
        description: createPayload.description
    })

    res.status(200).json({
        msg:"Todo created"
    })
});
app.put("/completed",async function (req,res){
    const updatePayload=req.body;
    const parsedPayload=updatePayload.safeParse(updateTodo);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"you sent a wrong input"
        })
        return;  
    }
    await Todo.updateOne({
       _id:req.body.id
    },
    {
        compleated:true
    }
)
    req.json({
        msg:"Todo updated"
    })
});


 
app.listen(port,function(){
    console.log(`app is listning at port ${port}`);
})