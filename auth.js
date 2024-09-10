const express = require('express')


const app = express()

app.use(express.json());

const users = [];
function generateToken(){
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for(let i =0;i<32;i++){
        token = token + options[Math.floor(Math.random()* options.length)];

    }
    return token;
}


app.post('/signup',function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username : username,
        password : password
    })
    res.json({
        message : "you are signed in!"
    })



})

app.post('/signin',function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    

    const founduser = users.find(function(u){
        if(u.username == username && u.password == password){
            return true;
        }
        else{
            return false;
        }
    })
    if(founduser){
        const token = generateToken();
        founduser.token = token;
        res.json({
            message : token
        })
    }
    else{
        res.status(403).send({
            message : "credentials didnt match"

        })
    }



    
})
app.get('/me',function(req,res){
    const token = req.headers.token;
    let founduser = null;
    for(let i=0;i<users.length;i++){
        if(users[i].token == token){
            founduser = users[i];
        }
        
    }
    if(founduser){
        res.json({
            username : founduser.username,
            password : founduser.password
        })
    }
    else{
        res.send({
            message : "token is invalid!"
        })
    }
})


app.listen(3000);