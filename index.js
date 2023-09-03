const express = require('express');
const app = express();
const port = 8080;
const jwt = require('jsonwebtoken');

app.get('/', (req, res) => {
    // res.send('<h1>Welcome to Node Js!!!</h1>')
    res.json({message: "Welcome to the page"})
})

app.post('/tokenGeneration',  (req, res) => {
    const user = {
        id: 1234,
        username: 'Febprof23',
        email: 'feb23prof@coding.com'
    }
    jwt.sign(user, 'secret',{expiresIn: '60s'}, function(err, token) {
        if(err){
            res.sendStatus(403);
        } else {
            res.json({token})
        }
    });
})

app.post('/verifyToken', extractToken, (req, res) => {
    jwt.verify(req.token, 'secret', function(err, data) {
       if(err){
        res.sendStatus(403);
       } else {
        res.json({
            message: "User access granted",
            data
        })
       }
    });
})


// middleware
function extractToken(req, res, next){
    const bearerHeader = req.headers['authorization']; // Bearer token
    if(bearerHeader !== undefined){
        const bearer = bearerHeader.split(' '); // ['Bearer', 'token']
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`)
        return;
    }
    console.log(`Server is up and running on port : ${port}`)
})