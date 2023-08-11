const express = require('express');
const bodyParser = require('body-parser');

const data = require('./data');

const newData = require('./newData');

const app = express();



app.use(bodyParser.json());


const port = 3000


app.get("/", (req, res) => {
res.send('Welcome here, the first is still the best')
})

// Sign up logic

app.post('/user/signup', (req, res) => {
    //res.send('signup here')
    //console.log(req.body)
    const{firstname, lastname, email, password} = req.body
    //data.push(firstname, lastname, email, password)

    if (!firstname || !lastname || !email || !password) {
        return res.json({
            status: "failure",
            message: "This filled is required",
        })

    };

    const checkUser = data.find(item => item.email === email)

    if (checkUser) return res.status(400).json({
        status: "failure",
        message: "user already exists",
        });

    data.push({
        firstname,
        lastname,
        email,
        password, 
        })   
        res.status(200).json({
            status: "success",
            message: "user successfully registered",
        })
        //console.log(req.body)
    

});


// login logic
app.post('/user/login', (req, res) => {
    //console.log(req.body)
    const {email, password} = req.body;

    if ( !email || !password) {
        return res.json({
            status: 'failure',
            messsage: 'This field is required',
        })
    };    

    const checkUser = data.find(user => user.email === email && user.password === password)
    if (!checkUser) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid username or password',
        })
    }

    res.status(200).json({
        status: 'success',
        message: 'Login successful',
    })

})

// Create post
app.post('/user/post', (req, res) => {
    const {author, content} = req.body

    const user = {
        id: newData.length+1,
        author,
        content,
    }

    newData.push(user)
    res.json({
        status: 'success',
        message: 'Your post was successful',
        post: content,
        data: newData
    })
})

// Read post

app.get('/user/read', (req, res) => {
   res.json({
    status: 'success',
    message: 'Your post has just been read',
    data: newData
   })
})

app.get('/user/read/:id', (req, res) => {
    const id = req.params.id

    const newPost = newData.find(item => item.id == id)
    res.json({
        result: newPost
    })
})

// Update post

app.put('/user/update/:id', (req, res) => {
    const id = req.params.id
    const {author, content} = req.body
    const newPost = newData.find(item => item.id == id)
    newPost.author = author
    newPost.content = content
    res.json({
    result: newPost
    })

})




//app.update('/user/update', (req, res) => {})

// Delete post



app.listen(port, ()=> {
    console.log('Lets get started here', port);
    
})