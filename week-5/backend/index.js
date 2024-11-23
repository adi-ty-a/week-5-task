// start writing from here

const cors = require('cors');
const express = require("express");
const JWT = require("jsonwebtoken");
const app = express();

const JWT_SECRET = "aviloveshismom";

    const users = [];
    const user_data = [];


app.use(cors());
app.use(express.json());

app.post("/sign-up",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username:username,
        password:password
    })
    res.json({
        msg:"sign up succesfull",
        users:users
    })
})

app.post("/sign-in",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find((e)=>{ return e.username == username && e.password == password })

    if(user){
        const token = JWT.sign({
            username:username,
        },JWT_SECRET)

    if(!user_data.some(u=>u.username==username)){
        user_data.push({
            username:username,
            todo:[]
        })
    }
        res.send({
            token
        })
    }
    else{
        res.status(404).send({
            message:"token failure"
        })
    }
})

function verification(req,res,next){
    const token = req.body.token;
    if(!token){
        res.status(401).json({
            message: "No token provided" 
        })
    }
    try{
    const decodetoken = JWT.verify(token,JWT_SECRET)
        req.username = decodetoken.username;
        next();
        
} catch(error){
    res.status(404).json({
        message:"Invalid or expired token"
    });
}
}

app.post("/todo",verification,(req,res)=>{
    const todo = req.body.todo;
    const username = req.username;
    const todouser = user_data.find(user => user.username === username);

    if(todouser){
        todouser.todo.push(todo);
        res.json(todouser.todo)
    }else{
        res.json({
            msg:"todo error"
        })
    }
    console.log(todouser.todo);
})

app.listen(3000);